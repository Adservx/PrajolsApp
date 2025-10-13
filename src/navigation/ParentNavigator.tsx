import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Parent Screens
import ParentDashboardScreen from '../screens/parent/ParentDashboardScreen';
import ChildrenListScreen from '../screens/parent/ChildrenListScreen';
import ChildProgressScreen from '../screens/parent/ChildProgressScreen';
import FeeManagementScreen from '../screens/parent/FeeManagementScreen';
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
      component={ParentDashboardScreen}
      options={{ title: 'Parent Dashboard' }}
    />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);

const ChildrenStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ChildrenList"
      component={ChildrenListScreen}
      options={{ title: 'My Children' }}
    />
    <Stack.Screen name="ChildProgress" component={ChildProgressScreen} />
  </Stack.Navigator>
);

const FeesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="FeeManagement"
      component={FeeManagementScreen}
      options={{ title: 'Fee Management' }}
    />
  </Stack.Navigator>
);

const ChatStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ChatList" component={ChatScreen} options={{ title: 'Messages' }} />
    <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
  </Stack.Navigator>
);

const ParentNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Children') {
            iconName = focused ? 'people' : 'people-outline';
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
      <Tab.Screen name="Children" component={ChildrenStack} />
      <Tab.Screen name="Fees" component={FeesStack} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default ParentNavigator;
