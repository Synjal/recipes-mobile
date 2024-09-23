import {StackNavigationProp} from "@react-navigation/stack";
import {Recipe} from "@/app/models/Recipe";


export type RootStackParamList = {
    SplashScreen: undefined
    BottomTabs: undefined
    RecipeScreen: undefined
    RecipeDetailsScreen: Recipe
    AddScreen: undefined
}

export type NavigationProp = StackNavigationProp<RootStackParamList>
