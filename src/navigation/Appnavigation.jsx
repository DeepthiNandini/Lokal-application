import React from "react";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Jobdetails from "../screens/Jobdetails";
import Tabs from "./Tabs";

const Stack = createStackNavigator();
const navigationRef = createNavigationContainerRef();

const Appnavigation = ()=>{
    return(
        <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Tabs">
          
        <Stack.Screen name="Tabs" component={Tabs} options={{headerShown:false}} />
        <Stack.Screen name="JOBDETAILS" component={Jobdetails}/>
            
        </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Appnavigation;