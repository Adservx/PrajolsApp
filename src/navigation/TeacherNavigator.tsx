import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Teacher Screens
import TeacherDashboardScreen from '../screens/teacher/TeacherDashboardScreen';
import ClassListScreen from '../screens/teacher/ClassListScreen';
import AttendanceScreen from '../screens/teacher/AttendanceScreen';
import AttendanceScannerScreen from '../screens/teacher/AttendanceScannerScreen';
import GradeEntryScreen from '../screens/teacher/GradeEntryScreen';
import AssignmentListScreen from '../screens/teacher/AssignmentListScreen';
import CreateAssignmentScreen from '../screens/teacher/CreateAssignmentScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={TeacherDashboardScreen}
      options={{ title: 'Teacher Dashboard' }}
    />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);

const ClassesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ClassList" component={ClassListScreen} options={{ title: 'My Classes' }} />
    <Stack.Screen name="AttendanceScanner" component={AttendanceScannerScreen} />
    <Stack.Screen name="Attendance" component={AttendanceScreen} />
    <Stack.Screen name="GradeEntry" component={GradeEntryScreen} />
  </Stack.Navigator>
);

const AssignmentsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AssignmentList"
      component={AssignmentListScreen}
      options={{ title: 'Assignments' }}
    />
    <Stack.Screen name="CreateAssignment" component={CreateAssignmentScreen} />
  </Stack.Navigator>
);

const TeacherNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Classes') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Assignments') {
            iconName = focused ? 'document-text' : 'document-text-outline';
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
      <Tab.Screen name="Classes" component={ClassesStack} />
      <Tab.Screen name="Assignments" component={AssignmentsStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TeacherNavigator;
