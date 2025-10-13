import { apiClient } from './api';
import { supabaseAuth } from './supabaseAuth';
import { User, LoginFormValues, RegisterFormValues } from '../types';
import { diagnoseNetworkIssue } from '../utils/networkHelper';

/**
 * AUTH SERVICE - USES SUPABASE AUTH + SUPABASE DATABASE
 * 
 * This service now delegates to supabaseAuth which uses:
 * - Supabase Authentication for user auth
 * - Supabase Database for data storage
 * 
 * Keeping this file for backwards compatibility with existing code.
 */

// Helper to handle network errors
const handleNetworkError = async (error: any) => {
  if (error.message?.includes('network') || error.message?.includes('connection')) {
    console.log('🔍 Diagnosing network issue...');
    const diagnosis = await diagnoseNetworkIssue();
    console.log('📊 Network diagnosis:', diagnosis);
    throw new Error(diagnosis);
  }
  throw error;
};

class AuthService {
  // Login with email and password
  async login(credentials: LoginFormValues) {
    try {
      return await supabaseAuth.login(credentials);
    } catch (error: any) {
      await handleNetworkError(error);
      throw error;
    }
  }

  // Register new user
  async register(userData: RegisterFormValues) {
    try {
      return await supabaseAuth.register(userData);
    } catch (error: any) {
      await handleNetworkError(error);
      throw error;
    }
  }

  // Logout
  async logout() {
    return await supabaseAuth.logout();
  }

  // Get current user
  async getCurrentUser(token?: string): Promise<User | null> {
    return await supabaseAuth.getCurrentUser();
  }

  // Refresh token
  async refreshToken(refreshToken?: string) {
    return await supabaseAuth.refreshToken();
  }

  // Google Sign In with OAuth (works with Expo Go)
  async googleSignInWithOAuth() {
    return await supabaseAuth.googleSignInWithOAuth();
  }

  // Google Sign In with ID token (legacy - requires custom dev client)
  async googleSignIn(idToken: string) {
    return await supabaseAuth.googleSignIn(idToken);
  }

  // Forgot Password
  async forgotPassword(email: string) {
    return await supabaseAuth.forgotPassword(email);
  }

  // Auth state listener
  onAuthStateChanged(callback: (user: User | null) => void) {
    return supabaseAuth.onAuthStateChanged(callback);
  }

  // Update user profile
  async updateUserProfile(updates: Partial<User>) {
    return await supabaseAuth.updateUserProfile(updates);
  }

  // Get access token
  async getIdToken() {
    return await supabaseAuth.getIdToken();
  }

  // Get session
  async getSession() {
    return await supabaseAuth.getSession();
  }

  // Verify 2FA code (placeholder - implement with actual 2FA service)
  async verify2FA(code: string) {
    try {
      // Implement 2FA verification logic
      return await apiClient.post('/auth/verify-2fa', { code });
    } catch (error: any) {
      throw new Error(error.message || '2FA verification failed');
    }
  }
}

export const authService = new AuthService();
export default authService;
