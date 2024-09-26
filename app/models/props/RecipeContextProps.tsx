import { Recipe } from '@/app/models/Recipe'
import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface RecipeProviderProps {
    children: ReactNode
}

export interface RecipeContextProps {
    recipes: Recipe[]
    setRecipes: Dispatch<SetStateAction<Recipe[]>>
    getAllRecipes: () => Promise<void>
    addRecipe: (recipe: Recipe) => Promise<void>
    updateRecipe: (recipe: Recipe) => Promise<void>
    bookmarkRecipe: (recipe: Recipe) => Promise<void>
    deleteRecipe: (recipeId: string) => Promise<void>
}

export const defaultRecipeContextValue: RecipeContextProps = {
    recipes: [],
    setRecipes: () => {},
    getAllRecipes: async () => {},
    addRecipe: async () => {},
    updateRecipe: async () => {},
    bookmarkRecipe: async () => {},
    deleteRecipe: async () => {},
}
