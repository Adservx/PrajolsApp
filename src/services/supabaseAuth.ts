/**
 * Supabase Authentication Service
 * 
 * This service uses Supabase Auth for both authentication and database operations.
 * - Supabase handles authentication (sign in, sign up, tokens, sessions)
 * - Supabase handles all database operations (user data, application data)
 */

import { supabase } from './supabase';
import { User, LoginFormValues, RegisterFormValues } from '../types';
import { AuthError, Session, User as SupabaseUser } from '@supabase/supabase-js';

// Helper function to format Supabase error messages
const getSupabaseErrorMessage = (error: AuthError | Error | null): string => {
  if (!error) return 'An error occurred. Please try again.';
  
  const message = error.message.toLowerCase();
  
  if (message.includes('invalid login credentials') || message.includes('invalid email or password')) {
    return 'Invalid email or password. Please check your credentials.';
  }
  if (message.includes('email not confirmed')) {
    return 'Please verify your email address before signing in.';
  }
  if (message.includes('user already registered')) {
    return 'This email is already registered. Please sign in instead.';
  }
  if (message.includes('password should be at least')) {
    return 'Password is too weak. Please use at least 6 characters.';
  }
  if (message.includes('invalid email')) {
    return 'Invalid email address format.';
  }
  if (message.includes('network')) {
    return 'Network connection failed. Please check your internet and try again.';
  }
  if (message.includes('too many requests')) {
    return 'Too many attempts. Please try again later.';
  }
  
  return error.message || 'An error occurred. Please try again.';
};

// Helper function to add timeout to promises
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number = 10000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
    ),
  ]);
};

class SupabaseAuthService {
  /**
   * Sync Supabase Auth user to users table
   */
  private async syncUserToDatabase(
    supabaseUser: SupabaseUser, 
    additionalData?: Partial<User>
  ): Promise<User> {
    try {
      console.log('🔄 Syncing user to database...', supabaseUser.id);

      // Check if user exists in database
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', supabaseUser.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 means no rows returned
        console.error('Error fetching user from database:', fetchError);
        throw new Error('Failed to fetch user data');
      }

      const email = supabaseUser.email || '';
      const names = supabaseUser.user_metadata?.full_name?.split(' ') || 
                    supabaseUser.user_metadata?.name?.split(' ') || 
                    ['User', ''];
      
      const userData: any = {
        auth_user_id: supabaseUser.id,
        email: email,
        first_name: additionalData?.firstName || supabaseUser.user_metadata?.first_name || names[0] || 'User',
        last_name: additionalData?.lastName || supabaseUser.user_metadata?.last_name || names[1] || '',
        role: additionalData?.role || 'student',
        phone: additionalData?.phone || supabaseUser.phone || null,
        avatar: supabaseUser.user_metadata?.avatar_url || additionalData?.avatar || null,
        is_active: true,
        updated_at: new Date().toISOString(),
      };

      if (existingUser) {
        // Update existing user
        console.log('📝 Updating existing user in database...');
        const { data, error } = await supabase
          .from('users')
          .update(userData)
          .eq('auth_user_id', supabaseUser.id)
          .select()
          .single();

        if (error) {
          console.error('Error updating user in database:', error);
          throw new Error('Failed to update user data');
        }

        console.log('✅ User updated in database');
        return this.mapDatabaseUserToAppUser(data);
      } else {
        // Create new user
        console.log('✨ Creating new user in database...');
        userData.created_at = new Date().toISOString();

        const { data, error } = await supabase
          .from('users')
          .insert([userData])
          .select()
          .single();

        if (error) {
          console.error('Error creating user in database:', error);
          throw new Error('Failed to create user data');
        }

        console.log('✅ User created in database');
        return this.mapDatabaseUserToAppUser(data);
      }
    } catch (error) {
      console.error('❌ Error syncing user to database:', error);
      throw error;
    }
  }

  /**
   * Map database user data to app User type
   */
  private mapDatabaseUserToAppUser(dbUser: any): User {
    return {
      id: dbUser.auth_user_id,
      email: dbUser.email,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      role: dbUser.role,
      phone: dbUser.phone,
      avatar: dbUser.avatar,
      createdAt: dbUser.created_at,
      updatedAt: dbUser.updated_at,
      isActive: dbUser.is_active,
    };
  }

  /**
   * Login with email and password
   */
  async login(credentials: LoginFormValues) {
    try {
      console.log('🔐 Attempting login for:', credentials.email);

      const { data, error } = await withTimeout(
        supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        })
      );

      if (error) throw error;
      if (!data.user || !data.session) throw new Error('Login failed');

      console.log('✅ Supabase Auth successful, UID:', data.user.id);

      // Sync user data to database
      const userData = await this.syncUserToDatabase(data.user);

      return {
        user: userData,
        token: data.session.access_token,
        refreshToken: data.session.refresh_token,
      };
    } catch (error: any) {
      console.error('❌ Login error:', error);
      const message = getSupabaseErrorMessage(error);
      throw new Error(message);
    }
  }

  /**
   * Register new user
   */
  async register(userData: RegisterFormValues) {
    try {
      console.log('📝 Registering new user:', userData.email);

      // Create Supabase Auth user
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            full_name: `${userData.firstName} ${userData.lastName}`,
          },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error('Registration failed');

      console.log('✅ Supabase user created, UID:', data.user.id);

      // If email confirmation is required, return early
      if (!data.session) {
        console.log('📧 Email confirmation required');
        // Create basic user data without session
        const newUser = await this.syncUserToDatabase(data.user, {
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          phone: userData.phone,
        });

        return {
          user: newUser,
          token: '',
          refreshToken: '',
          emailConfirmationRequired: true,
        };
      }

      // Create user in database with additional data
      const newUser = await this.syncUserToDatabase(data.user, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        phone: userData.phone,
      });

      return {
        user: newUser,
        token: data.session.access_token,
        refreshToken: data.session.refresh_token,
      };
    } catch (error: any) {
      console.error('❌ Registration error:', error);
      const message = getSupabaseErrorMessage(error);
      throw new Error(message);
    }
  }

  /**
   * Logout
   */
  async logout() {
    try {
      console.log('👋 Logging out...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('✅ Logged out successfully');
    } catch (error: any) {
      console.error('❌ Logout error:', error);
      throw new Error(error.message || 'Logout failed');
    }
  }

  /**
   * Get current user from database
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      
      if (!supabaseUser) {
        console.log('ℹ️ No Supabase user logged in');
        return null;
      }

      console.log('🔍 Fetching user from database:', supabaseUser.id);

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Error fetching user from database:', error);
        // Try to sync user if not found
        if (error.code === 'PGRST116') {
          console.log('🔄 User not found in database, syncing...');
          return await this.syncUserToDatabase(supabaseUser);
        }
        throw new Error('Failed to get current user');
      }

      return this.mapDatabaseUserToAppUser(data);
    } catch (error: any) {
      console.error('❌ Error getting current user:', error);
      throw new Error(error.message || 'Failed to get current user');
    }
  }

  /**
   * Refresh token
   */
  async refreshToken() {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      if (!data.session) throw new Error('No session found');

      return {
        token: data.session.access_token,
        refreshToken: data.session.refresh_token,
      };
    } catch (error: any) {
      console.error('❌ Token refresh error:', error);
      throw new Error(error.message || 'Token refresh failed');
    }
  }

  /**
   * Google Sign In (using Supabase OAuth with WebBrowser)
   * This works with Expo Go!
   */
  async googleSignInWithOAuth() {
    try {
      console.log('🔐 Starting Google OAuth sign-in...');

      // Import required modules
      const WebBrowser = await import('expo-web-browser');
      const Constants = await import('expo-constants');
      const { Linking } = await import('react-native');
      
      // Important: Complete any existing auth sessions
      WebBrowser.maybeCompleteAuthSession();

      // Determine the correct redirect URL based on environment
      let redirectUrl: string;
      
      if (Constants.default.appOwnership === 'expo') {
        // Running in Expo Go (development) - use exp:// scheme
        // This will use your current Metro bundler URL
        const devUrl = Constants.default.experienceUrl || 'exp://localhost:8081';
        redirectUrl = `${devUrl}/--/auth/callback`;
        console.log('📱 Running in Expo Go (DEV), using redirect:', redirectUrl);
        console.log('⚠️  Add this URL to Supabase Redirect URLs for development');
      } else {
        // Standalone/Production app - use custom scheme
        redirectUrl = 'prajolsapp://auth/callback';
        console.log('📱 Running in Production app, using redirect:', redirectUrl);
      }

      // Get the OAuth URL from Supabase with proper query params handling
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('❌ OAuth URL generation error:', error);
        throw error;
      }
      
      if (!data?.url) {
        throw new Error('No OAuth URL received from Supabase');
      }

      console.log('✅ Google OAuth URL generated');
      console.log('🌐 Opening browser...');
      console.log('🔗 Redirect URL:', redirectUrl);
      
      // Open the browser with proper configuration
      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectUrl,
        {
          // Don't show the URL in recents to avoid security issues
          showInRecents: false,
          // Create a new task for the browser
          createTask: true,
        }
      );

      console.log('🔍 WebBrowser result type:', result.type);
      if (__DEV__) {
        console.log('🔍 WebBrowser full result:', JSON.stringify(result, null, 2));
      }

      if (result.type === 'success') {
        console.log('✅ OAuth completed successfully');
        
        // Extract tokens from the callback URL
        const callbackUrl = result.url;
        if (__DEV__) {
          console.log('🔗 Callback URL received:', callbackUrl);
        }
        
        // Handle both hash (#) and query (?) parameters
        let params;
        if (callbackUrl.includes('#')) {
          const hashPart = callbackUrl.split('#')[1];
          params = new URLSearchParams(hashPart);
        } else if (callbackUrl.includes('?')) {
          const queryPart = callbackUrl.split('?')[1];
          params = new URLSearchParams(queryPart);
        } else {
          console.error('❌ URL has no # or ? parameters');
          throw new Error('Invalid callback URL format');
        }
        
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');
        const error_description = params.get('error_description');
        const error_code = params.get('error');
        
        if (error_description || error_code) {
          console.error('❌ OAuth returned error:', error_description || error_code);
          throw new Error(`OAuth error: ${error_description || error_code}`);
        }
        
        if (!access_token || !refresh_token) {
          console.error('❌ Tokens not found in callback URL');
          if (__DEV__) {
            console.error('Debug - All params:', Array.from(params.entries()));
          }
          throw new Error('No authentication tokens received');
        }
        
        console.log('✅ Tokens extracted successfully');
        console.log('🔐 Setting session in Supabase...');
        
        // Set the session in Supabase
        const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        
        if (sessionError) {
          console.error('❌ Session error:', sessionError);
          throw sessionError;
        }
        
        if (!sessionData.user) {
          throw new Error('No user data received from session');
        }
        
        console.log('✅ Session created successfully');
        console.log('👤 User:', sessionData.user.email);
        
        // Sync user to database
        const userData = await this.syncUserToDatabase(sessionData.user);
        
        return {
          user: userData,
          token: access_token,
          refreshToken: refresh_token,
        };
      } else if (result.type === 'cancel') {
        console.log('⚠️ User cancelled OAuth');
        throw new Error('Sign-in was cancelled');
      } else if (result.type === 'dismiss') {
        console.log('⚠️ Browser dismissed');
        throw new Error('Sign-in was dismissed');
      } else {
        console.error('❌ Unexpected result type:', result.type);
        throw new Error('Sign-in failed with unexpected result');
      }
    } catch (error: any) {
      console.error('❌ Google OAuth error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        status: error.status,
      });
      
      const message = getSupabaseErrorMessage(error);
      throw new Error(message);
    }
  }

  /**
   * Legacy method for compatibility (using native Google Sign-In with ID token)
   * Only works with custom dev client
   */
  async googleSignIn(idToken: string) {
    try {
      console.log('🔐 Authenticating with Supabase using Google ID token...');

      // Sign in to Supabase using Google ID token
      const { data, error } = await withTimeout(
        supabase.auth.signInWithIdToken({
          provider: 'google',
          token: idToken,
        })
      );

      if (error) throw error;
      if (!data.user || !data.session) throw new Error('Google sign-in failed');

      console.log('✅ Supabase Auth successful with Google, UID:', data.user.id);

      // Sync user data to database
      const userData = await this.syncUserToDatabase(data.user);

      return {
        user: userData,
        token: data.session.access_token,
        refreshToken: data.session.refresh_token,
      };
    } catch (error: any) {
      console.error('❌ Google sign-in error:', error);
      const message = getSupabaseErrorMessage(error);
      throw new Error(message);
    }
  }

  /**
   * Forgot Password
   */
  async forgotPassword(email: string) {
    try {
      console.log('📧 Sending password reset email to:', email);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'yourapp://reset-password', // Configure this based on your app
      });
      
      if (error) throw error;
      console.log('✅ Password reset email sent');
    } catch (error: any) {
      console.error('❌ Forgot password error:', error);
      const message = getSupabaseErrorMessage(error);
      throw new Error(message);
    }
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChanged(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔔 Auth state changed:', event);
      
      if (session?.user) {
        try {
          // Sync user to database and return
          const user = await this.syncUserToDatabase(session.user);
          callback(user);
        } catch (error) {
          console.error('Error syncing user on auth state change:', error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }

  /**
   * Update user profile in database
   */
  async updateUserProfile(updates: Partial<User>) {
    try {
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      if (!supabaseUser) throw new Error('No user logged in');

      console.log('📝 Updating user profile in database...');

      const dbUpdates: any = {
        updated_at: new Date().toISOString(),
      };

      if (updates.firstName) dbUpdates.first_name = updates.firstName;
      if (updates.lastName) dbUpdates.last_name = updates.lastName;
      if (updates.phone) dbUpdates.phone = updates.phone;
      if (updates.avatar) dbUpdates.avatar = updates.avatar;
      if (updates.role) dbUpdates.role = updates.role;

      const { data, error } = await supabase
        .from('users')
        .update(dbUpdates)
        .eq('auth_user_id', supabaseUser.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating user profile:', error);
        throw new Error('Failed to update profile');
      }

      // Also update Supabase Auth user metadata if name changed
      if (updates.firstName || updates.lastName) {
        const { error: authError } = await supabase.auth.updateUser({
          data: {
            first_name: updates.firstName,
            last_name: updates.lastName,
            full_name: `${updates.firstName || ''} ${updates.lastName || ''}`.trim(),
          },
        });
        
        if (authError) {
          console.warn('Warning: Failed to update auth metadata:', authError);
        }
      }

      console.log('✅ User profile updated');
      return this.mapDatabaseUserToAppUser(data);
    } catch (error: any) {
      console.error('❌ Update profile error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  }

  /**
   * Get access token for API calls
   */
  async getIdToken(): Promise<string | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.access_token || null;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  /**
   * Get current session
   */
  async getSession(): Promise<Session | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }
}

export const supabaseAuth = new SupabaseAuthService();
export default supabaseAuth;
