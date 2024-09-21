import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { RecipesScreen } from "@/app/screens/RecipesScreen";
import { FavoritesScreen } from "@/app/screens/FavoritesScreen";
import {AddScreen} from "@/app/screens/AddScreen";

export const BottomTabs = () => {
    const [index, setIndex] = useState<number>(0)
    const routes: { key: string, title: string, focusedIcon: string, unfocusedIcon: string }[] = [
        { key: 'recipes', title: 'Recipes', focusedIcon: 'notebook', unfocusedIcon: 'notebook-outline' },
        { key: 'fav', title: 'Favorite', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
        { key: 'add', title: 'Add', focusedIcon: 'plus-circle', unfocusedIcon: 'plus-circle-outline' }
    ]

    const renderScene = BottomNavigation.SceneMap(
        {
            recipes: RecipesScreen,
            fav: FavoritesScreen,
            add: AddScreen,
        }
    )

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={ setIndex }
            renderScene={ renderScene }
            compact
        />
    )
}
