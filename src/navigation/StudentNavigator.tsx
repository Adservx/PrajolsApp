import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Student Screens
import StudentDashboardScreen from '../screens/student/StudentDashboardScreen';
import ScheduleScreen from '../screens/student/ScheduleScreen';
import GradesScreen from '../screens/student/GradesScreen';
import AssignmentsScreen from '../screens/student/AssignmentsScreen';
import AssignmentDetailScreen from '../screens/student/AssignmentDetailScreen';
import FeePaymentScreen from '../screens/student/FeePaymentScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={StudentDashboardScreen}
      options={{ title: 'My Dashboard' }}
    />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);

const AcademicsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'My Schedule' }} />
    <Stack.Screen name="Grades" component={GradesScreen} />
    <Stack.Screen name="Assignments" component={AssignmentsScreen} />
    <Stack.Screen name="AssignmentDetail" component={AssignmentDetailScreen} />
  </Stack.Navigator>
);

const FeesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="FeePayment" component={FeePaymentScreen} options={{ title: 'Fees' }} />
  </Stack.Navigator>
);

const ChatStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ChatList" component={ChatScreen} options={{ title: 'Messages' }} />
    <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
  </Stack.Navigator>
);

const StudentNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Academics') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Fees') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
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
      <Tab.Screen name="Academics" component={AcademicsStack} />
      <Tab.Screen name="Fees" component={FeesStack} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default StudentNavigator;
