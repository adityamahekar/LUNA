
import React from 'react';
import { StyleSheet } from 'react-native';

import Home from './src/screens/Home';
import DM from './src/screens/DM';
import Post from './src/screens/Post'
import MiniApps from './src/screens/MiniApps'
import Search from './src/screens/Search'

// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// icon
import { AntDesign, Ionicons, Entypo, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';


import { PlatformPressable } from '@react-navigation/elements';


const Tab = createBottomTabNavigator();

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
      pressOpacity={1}                              // iOS: 1 = no fade
      android_ripple={{ color: 'transparent' }}     // Android: no ripple
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
          backgroundColor: 'rgba(255,255,255,0.14)',   // the tint over the blur

          paddingHorizontal: 8,
          borderTopWidth: 0,

          // outer shadow (0 12px 32px rgba(0,0,0,0.2))
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 12 },
          shadowRadius: 32,
          shadowOpacity: 0.2,
          elevation: 12,
        },
        
        tabBarItemStyle: {
          marginHorizontal: 6,     // shrinks the box horizontally → width
          marginVertical: 6,       // shrinks it vertically → height
          borderRadius: 100,        // shape
          overflow: 'hidden',      // required — without it the radius is ignored on Android
        },

      }}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="newspaper-variant" size={size} color={color} />), }} />
      <Tab.Screen name="Post" component={Post} options={{ tabBarIcon: ({ color, size }) => (<Entypo name="plus" size={size} color={color} />), }} />
      <Tab.Screen name="DM" component={DM} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="chatbubble-outline" size={size} color={color} />), }} />
      <Tab.Screen name="Apps" component={MiniApps} options={{ tabBarIcon: ({ color, size }) => (<Octicons name="apps" size={size} color={color} />), }} />
      <Tab.Screen name="Search" component={Search} options={{ tabBarIcon: ({ color, size }) => (<AntDesign name="compass" size={size} color={color} />), }} />
    </Tab.Navigator>

  );
}

// Main App
const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
