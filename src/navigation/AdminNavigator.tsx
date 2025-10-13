import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Admin Screens
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AnalyticsScreen from '../screens/admin/AnalyticsScreen';
import StudentListScreen from '../screens/admin/StudentListScreen';
import StudentDetailScreen from '../screens/admin/StudentDetailScreen';
import TeacherListScreen from '../screens/admin/TeacherListScreen';
import TeacherDetailScreen from '../screens/admin/TeacherDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={AdminDashboardScreen}
      options={{ title: 'Admin Dashboard' }}
    />
    <Stack.Screen name="Analytics" component={AnalyticsScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);

const StudentsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="StudentList"
      component={StudentListScreen}
      options={{ title: 'Students' }}
    />
    <Stack.Screen name="StudentDetail" component={StudentDetailScreen} />
  </Stack.Navigator>
);

const TeachersStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="TeacherList"
      component={TeacherListScreen}
      options={{ title: 'Teachers' }}
    />
    <Stack.Screen name="TeacherDetail" component={TeacherDetailScreen} />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ title: 'Settings' }} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

const AdminNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Students') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Teachers') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DashboardStack} />
      <Tab.Screen name="Students" component={StudentsStack} />
      <Tab.Screen name="Teachers" component={TeachersStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default AdminNavigator;
