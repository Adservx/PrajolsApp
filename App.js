import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';
import { store, persistor } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { LoadingSpinner } from './src/components/LoadingSpinner';
import { supabaseAuth } from './src/services/supabaseAuth';
import { supabase } from './src/services/supabase';
import { setAuthComplete, clearAuth } from './src/store/slices/authSlice';
import * as SecureStore from 'expo-secure-store';

function AuthListener() {
  useEffect(() => {
    // Listen for auth state changes
    const authSubscription = supabaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log('🔔 User authenticated:', user.email);
        
        // Get the session to extract tokens
        const session = await supabaseAuth.getSession();
        if (session) {
          // Store tokens
          await SecureStore.setItemAsync('token', session.access_token);
          await SecureStore.setItemAsync('refreshToken', session.refresh_token);
          
          // Update Redux store with complete auth data
          store.dispatch(setAuthComplete({
            user,
            token: session.access_token,
            refreshToken: session.refresh_token,
          }));
        }
      } else {
        console.log('🔔 User logged out');
        store.dispatch(clearAuth());
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('refreshToken');
      }
    });

    // Handle deep links for OAuth callback
    const handleDeepLink = async (event) => {
      const url = event.url;
      console.log('🔗 Deep link received:', url);
      
      if (url && url.includes('auth/callback')) {
        try {
          // Extract the URL hash/query params
          const urlObj = new URL(url);
          
          // Try hash params first (OAuth usually uses hash)
          let params = new URLSearchParams(urlObj.hash.substring(1));
          
          // If no hash params, try query params
          if (!params.get('access_token')) {
            params = new URLSearchParams(urlObj.search.substring(1));
          }
          
          const access_token = params.get('access_token');
          const refresh_token = params.get('refresh_token');
          
          if (access_token && refresh_token) {
            console.log('✅ Tokens found in deep link, setting session...');
            
            // Set the session in Supabase
            const { error } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });
            
            if (error) {
              console.error('❌ Error setting session from deep link:', error);
            } else {
              console.log('✅ Session set from deep link');
            }
          }
        } catch (error) {
          console.error('❌ Error processing deep link:', error);
        }
      }
    };

    // Listen for deep links (when app is already open)
    const linkingSubscription = Linking.addEventListener('url', handleDeepLink);

    // Check if app was opened via deep link (when app was closed)
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      if (authSubscription?.data?.subscription) {
        authSubscription.data.subscription.unsubscribe();
      }
      linkingSubscription.remove();
    };
  }, []);

  return null;
}

export default function App() {
  // Note: Google Sign-In uses Supabase OAuth flow (no native module required)
  // See googleSignInWithOAuth() in src/services/supabaseAuth.ts

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={<LoadingSpinner fullScreen />} persistor={persistor}>
          <SafeAreaProvider>
            <AuthListener />
            <AppNavigator />
            <StatusBar style="auto" />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
