import { NavigationProp } from "@/types";
import { Recipe } from "@/app/models/Recipe";

export interface SplashScreenProps {
    navigation: NavigationProp
}

export interface HomeScreenProps {
    navigation: NavigationProp
}

export interface RecipeCardProps {
    recipe: Recipe
    width: number
}

export interface SearchbarRecipesProps {
    onSearch: (query: string) => void
}

export interface BackHeaderProps {
    favorite: boolean | undefined
}
