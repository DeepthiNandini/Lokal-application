import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Jobs from '../screens/Jobs';
import Bookmarks from '../screens/Bookmarks';
import { Image, StyleSheet } from "react-native";
import JobsIcon from '../assests/icons/jobs.png';
import BookmarksIcon from '../assests/icons/save-instagram.png';
import Jobdetails from "../screens/Jobdetails";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === 'JOBS') {
            icon = focused ? JobsIcon : JobsIcon; // Use the same icon for Jobs
          } else if (route.name === 'BOOKMARKS') {
            icon = focused ? BookmarksIcon : BookmarksIcon; // Use the same icon for Bookmarks
          }

          return <Image source={icon} style={[styles.icon, { tintColor: focused ? color : 'gray' }]} />;
        },
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: 'white', // Color when tab is active
        tabBarInactiveTintColor: 'lightgray', // Color when tab is inactive
        tabBarLabelStyle: styles.tabBarLabel,
      })}
    >
      <Tab.Screen name='JOBS' component={Jobs} />
      <Tab.Screen name='BOOKMARKS' component={Bookmarks} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#3e7573',
    margin: 5,
    borderRadius: 20,
    height: 70,
    marginBottom: 15,
    justifyContent: 'center',
    position: 'absolute',
    left: 15,
    right: 15,
  },
  tabBarLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    borderRadius: 30,
    paddingBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Tabs;
