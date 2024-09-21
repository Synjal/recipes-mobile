import React, { FC } from "react";
import { createStackNavigator } from '@react-navigation/stack'

import { SplashScreen } from './screens/SplashScreen';
import {Home} from "@/app/screens/Home";
import {RecipeDetailsScreen} from "@/app/screens/RecipeDetailsScreen";
import {AddScreen} from "@/app/screens/AddScreen";
import {RecipesScreen} from "@/app/screens/RecipesScreen";
import {PaperProvider} from "react-native-paper";

const Stack = createStackNavigator()

const Index: FC = () => {
    return (
        <PaperProvider>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="RecipeScreen" component={RecipesScreen}/>
                <Stack.Screen name="RecipeDetailsScreen" component={RecipeDetailsScreen}/>
                <Stack.Screen name="AddScreen" component={AddScreen}/>
            </Stack.Navigator>
        </PaperProvider>
    )
}

export default Index
