
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import Home from './src/screens/Home';
import DM from './src/screens/DM';
import Post from './src/screens/Post';
import MiniApps from './src/screens/MiniApps';
import Search from './src/screens/Search';
import SideProfile from './src/screens/drawer/SideProfile';

// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PlatformPressable } from '@react-navigation/elements';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Icons
import {
  AntDesign,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


// Dynamic selected tab state
const getActiveRouteName = (state) => {
  if (!state) return 'Home';

  const route = state.routes[state.index];

  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
};


// Bottom Tab Navigator
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#68cbf3',
        tabBarIconSize: 28,
        tabBarActiveBackgroundColor: 'lightgrey',
        tabBarActiveBorder: 50,
        tabBarInactiveTintColor: 'grey',

        tabBarButton: (props) => (
          <PlatformPressable
            {...props}
            pressOpacity={1}
            android_ripple={{ color: 'transparent' }}
          />
        ),

        tabBarStyle: {
          position: 'absolute',
          left: 50,
          right: 50,
          bottom: 60,
          height: 70,
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 50,
          paddingTop: 10,
          paddingBottom: 5,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0.12,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
          borderColor: 'rgba(255,255,255,0.35)',
          backgroundColor: 'rgba(255,255,255,0.14)',

          paddingHorizontal: 8,

          // Outer shadow
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 12 },
          shadowRadius: 32,
          shadowOpacity: 0.2,
          elevation: 12,
        },

        tabBarItemStyle: {
          marginHorizontal: 6,
          marginVertical: 6,
          borderRadius: 100,
          overflow: 'hidden',
        },
      }}
    >

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="newspaper-variant"
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo
              name="plus"
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="DM"
        component={DM}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbubble-outline"
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Apps"
        component={MiniApps}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons
              name="apps"
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="compass"
              size={28}
              color={color}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
}


// Drawer Navigator
function MyDrawer({ activeTab }) {

  // Dynamic overlapping icon mapping
  const iconMap = {
    Home: 'home-outline',
    Post: 'plus-circle-outline',
    DM: 'chat-outline',
    Apps: 'apps',
    Search: 'compass-outline',
    Profile: 'account-outline',
  };

  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={({ navigation }) => ({

        headerShown: true,

        // Drawer swipe settings
        swipeEnabled: true,
        swipeEdgeWidth: 90,
        drawerType: 'front',

        headerTitle: 'LUNA',

        headerLeft: () => (
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            hitSlop={12}
            style={{
              marginLeft: 16,
              width: 42,
              height: 42,
              justifyContent: 'center',
            }}
          >

            {/* Main account icon */}
            <MaterialCommunityIcons
              name="account-circle"
              size={35}
              color="black"
              style={{
                position: 'absolute',
                left: 0,
                top: 2,
              }}
            />

            {/* Dynamic overlapping icon */}
            <MaterialCommunityIcons
              name={iconMap[activeTab] || 'home-outline'}
              size={30}
              color="#68cbf3"
              style={{
                position: 'absolute',
                right: -3,
                bottom: -2,
              }}
            />

          </Pressable>
        ),
      })}
    >

      <Drawer.Screen
        name="Main"
        component={MyTabs}
      />

      <Drawer.Screen
        name="Profile"
        component={SideProfile}
      />

    </Drawer.Navigator>
  );
}


// Main App
const App = () => {

  const [activeTab, setActiveTab] = useState('Home');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <NavigationContainer
        onReady={(navigationRef) => {
          // Initial selected screen
        }}
        onStateChange={(state) => {
          const routeName = getActiveRouteName(state);
          setActiveTab(routeName);
        }}
      >

        <MyDrawer activeTab={activeTab} />

      </NavigationContainer>

    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
