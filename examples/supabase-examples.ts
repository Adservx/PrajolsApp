/**
 * Supabase Usage Examples for PrajolsApp
 * 
 * This file contains practical examples of using Supabase in your React Native app.
 * Import the supabase client from '../services/supabase' to use these examples.
 */

import { supabase } from '../services/supabase';

// ==========================================
// AUTHENTICATION EXAMPLES
// ==========================================

/**
 * Example 1: Sign Up a New User
 */
export const signUpUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Sign up error:', error.message);
      return { success: false, error: error.message };
    }

    console.log('User signed up:', data.user);
    return { success: true, user: data.user };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

/**
 * Example 2: Sign In with Email and Password
 */
export const signInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error.message);
      return { success: false, error: error.message };
    }

    console.log('User signed in:', data.user);
    return { success: true, user: data.user, session: data.session };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

/**
 * Example 3: Sign Out Current User
 */
export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign out error:', error.message);
      return { success: false, error: error.message };
    }

    console.log('User signed out successfully');
    return { success: true };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

/**
 * Example 4: Get Current User
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Get user error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, user };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

/**
 * Example 5: Listen to Auth State Changes
 */
export const setupAuthListener = (callback: (user: any) => void) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      callback(session?.user ?? null);
    }
  );

  // Return unsubscribe function
  return () => subscription.unsubscribe();
};

// ==========================================
// DATABASE EXAMPLES
// ==========================================

/**
 * Example 6: Fetch All Records from a Table
 */
export const fetchAllStudents = async () => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*');

    if (error) {
      console.error('Fetch error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

/**
 * Example 7: Fetch Records with Filters
 */
export const fetchStudentsByClass = async (className: string) => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('class', className)
      .order('name', { ascending: true });

    if (error) {
      console.error('Fetch error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

/**
 * Example 8: Insert a New Record
 */
export const addStudent = async (studentData: any) => {
  try {
    const { data, error } = await supabase
      .from('students')
      .insert([studentData])
      .select();

    if (error) {
      console.error('Insert error:', error.message);
      return { success: false, error: error.message };
    }

    console.log('Student added:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

/**
 * Example 9: Update an Existing Record
 */
export const updateStudent = async (studentId: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', studentId)
      .select();

    if (error) {
      console.error('Update error:', error.message);
      return { success: false, error: error.message };
    }

    console.log('Student updated:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

/**
 * Example 10: Delete a Record
 */
export const deleteStudent = async (studentId: string) => {
  try {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', studentId);

    if (error) {
      console.error('Delete error:', error.message);
      return { success: false, error: error.message };
    }

    console.log('Student deleted');
    return { success: true };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

// ==========================================
// REAL-TIME EXAMPLES
// ==========================================

/**
 * Example 11: Subscribe to Table Changes
 */
export const subscribeToStudents = (callback: (payload: any) => void) => {
  const subscription = supabase
    .channel('students-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'students' },
      (payload) => {
        console.log('Change received!', payload);
        callback(payload);
      }
    )
    .subscribe();

  // Return unsubscribe function
  return () => subscription.unsubscribe();
};

// ==========================================
// STORAGE EXAMPLES
// ==========================================

/**
 * Example 12: Upload a File
 */
export const uploadProfilePhoto = async (
  userId: string,
  file: any,
  fileName: string
) => {
  try {
    const filePath = `profile-photos/${userId}/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error.message);
      return { success: false, error: error.message };
    }

    console.log('File uploaded:', data);
    return { success: true, path: filePath };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

/**
 * Example 13: Get Public URL for a File
 */
export const getProfilePhotoUrl = (filePath: string) => {
  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

/**
 * Example 14: Download a File
 */
export const downloadFile = async (filePath: string) => {
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .download(filePath);

    if (error) {
      console.error('Download error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

// ==========================================
// ADVANCED EXAMPLES
// ==========================================

/**
 * Example 15: Complex Query with Joins
 */
export const fetchStudentsWithClasses = async () => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        classes (
          id,
          name,
          teacher
        )
      `);

    if (error) {
      console.error('Fetch error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

/**
 * Example 16: Using RPC (Remote Procedure Calls)
 */
export const callCustomFunction = async (params: any) => {
  try {
    const { data, error } = await supabase
      .rpc('your_custom_function', params);

    if (error) {
      console.error('RPC error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

// ==========================================
// USAGE IN REACT NATIVE COMPONENTS
// ==========================================

/**
 * Example 17: Complete Component Example
 * 
 * import React, { useEffect, useState } from 'react';
 * import { View, Text, FlatList, Button } from 'react-native';
 * import { fetchAllStudents, subscribeToStudents } from '../examples/supabase-examples';
 * 
 * export const StudentsScreen = () => {
 *   const [students, setStudents] = useState([]);
 *   const [loading, setLoading] = useState(true);
 * 
 *   useEffect(() => {
 *     loadStudents();
 * 
 *     // Subscribe to real-time changes
 *     const unsubscribe = subscribeToStudents((payload) => {
 *       console.log('Database change detected');
 *       loadStudents(); // Reload data
 *     });
 * 
 *     return () => unsubscribe();
 *   }, []);
 * 
 *   const loadStudents = async () => {
 *     setLoading(true);
 *     const result = await fetchAllStudents();
 *     if (result.success) {
 *       setStudents(result.data);
 *     }
 *     setLoading(false);
 *   };
 * 
 *   return (
 *     <View>
 *       {loading ? (
 *         <Text>Loading...</Text>
 *       ) : (
 *         <FlatList
 *           data={students}
 *           renderItem={({ item }) => (
 *             <Text>{item.name}</Text>
 *           )}
 *           keyExtractor={item => item.id}
 *         />
 *       )}
 *       <Button title="Refresh" onPress={loadStudents} />
 *     </View>
 *   );
 * };
 */
