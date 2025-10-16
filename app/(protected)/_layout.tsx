import { Stack } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="dashboard" 
        options={{ 
          title: 'Dashboard',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="students/index" 
        options={{ 
          title: 'Students',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="students/add" 
        options={{ 
          title: 'Add Student',
          headerShown: true,
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="students/[id]/edit" 
        options={{ 
          title: 'Edit Student',
          headerShown: true,
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="classes/index" 
        options={{ 
          title: 'Classes',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="classes/add" 
        options={{ 
          title: 'Add Class',
          headerShown: true,
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="assignments/index" 
        options={{ 
          title: 'Assignments',
          headerShown: true,
        }} 
      />
    </Stack>
  );
}
