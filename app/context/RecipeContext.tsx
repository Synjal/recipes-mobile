import React, { createContext, FC, useEffect, useState } from 'react'
import { Recipe } from '@/app/models/Recipe'
import {
    defaultRecipeContextValue,
    RecipeContextProps,
    RecipeProviderProps,
} from '@/app/models/props/RecipeContextProps'
import axios from 'axios/index'

export const RecipeContext = createContext<RecipeContextProps>(defaultRecipeContextValue)

export const RecipeProvider: FC<RecipeProviderProps> = ({ children }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([])

    useEffect(() => {
        getAllRecipes().then(() => console.log('All recipes loaded'))
    }, [])

    const getAllRecipes = async (): Promise<void> => {
        try {
            const response = await axios.get<{ recipes: Recipe[] }>(process.env.EXPO_PUBLIC_API_URL + 'recipe' || '')
            setRecipes(response.data.recipes)
        } catch (err) {
            console.error('Error fetching recipes:', err)
        }
    }

    const addRecipe = async (item: Recipe): Promise<void> => {
        try {
            await axios.post<Recipe>(process.env.EXPO_PUBLIC_API_URL + 'recipe' || '', item)
            await getAllRecipes()
        } catch (err) {
            console.error('Error adding recipe:', err)
        }
    }

    const updateRecipe = async (item: Recipe): Promise<void> => {
        try {
            await axios.put<Recipe>(process.env.EXPO_PUBLIC_API_URL + `recipe/${item.id}` || '', item)
            await getAllRecipes()
        } catch (err) {
            console.error('Error updating recipe:', err)
        }
    }

    const bookmarkRecipe = async (item: Recipe): Promise<void> => {
        try {
            item.favorite = !item.favorite
            await updateRecipe(item)
        } catch (err) {
            console.error('Error bookmarking recipe:', err)
        }
    }

    const deleteRecipe = async (id: number): Promise<void> => {
        try {
            await axios.delete(process.env.EXPO_PUBLIC_API_URL + `recipe/${id}` || '')
            await getAllRecipes()
        } catch (err) {
            console.error('Error deleting recipe:', err)
        }
    }

    return (
        <RecipeContext.Provider
            value={{
                recipes,
                setRecipes,
                getAllRecipes,
                addRecipe,
                updateRecipe,
                bookmarkRecipe,
                deleteRecipe,
            }}
        >
            {children}
        </RecipeContext.Provider>
    )
}
