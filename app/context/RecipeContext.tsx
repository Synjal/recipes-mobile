import React, { createContext, FC, useCallback, useEffect, useState } from 'react'
import { Recipe } from '@/app/models/Recipe'
import {
    defaultRecipeContextValue,
    RecipeContextProps,
    RecipeProviderProps,
} from '@/app/models/props/RecipeContextProps'
import axios from 'axios/index'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getMimeType } from '@/app/utils/getMimeType'

export const RecipeContext = createContext<RecipeContextProps>(defaultRecipeContextValue)

export const RecipeProvider: FC<RecipeProviderProps> = ({ children }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([])

    const getAllRecipes = useCallback(async (): Promise<void> => {
        try {
            const cachedRecipes = await AsyncStorage.getItem('recipes')
            setRecipes(cachedRecipes ? JSON.parse(cachedRecipes) : [])

            const response = await axios.get<{ recipes: Recipe[] }>(process.env.EXPO_PUBLIC_API_URL + 'recipe')
            setRecipes(response.data.recipes)

            await AsyncStorage.setItem('recipes', JSON.stringify(response.data.recipes))
        } catch (err) {
            console.error('Error fetching recipes:', err)
        }
    }, [])

    const uploadImage = async (recipe: Recipe): Promise<void> => {
        if (!recipe.image) {
            throw new Error('Image is required')
        }

        const formData = new FormData()
        const mimeType = getMimeType(recipe.image).split('/')[1]

        const image = {
            uri: recipe.image,
            name: recipe.title,
            type: 'image/' + mimeType,
        } as any
        formData.append('image', image)

        const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + 'image/' + recipe.id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    }

    const addRecipe = async (item: Recipe): Promise<void> => {
        try {
            console.log('Before adding: ', item)
            const newRecipe = await axios.post<Recipe>(process.env.EXPO_PUBLIC_API_URL + 'recipe', item)
            item.id = newRecipe.data.id
            console.log('After adding: ', item)

            item.image && (await uploadImage(item))

            await getAllRecipes()
        } catch (err) {
            console.error('Error adding recipe:', err)
        }
    }

    const updateRecipe = async (item: Recipe): Promise<void> => {
        try {
            await axios.put<Recipe>(process.env.EXPO_PUBLIC_API_URL + `recipe/${item.id}`, item)
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

    const deleteRecipe = async (id: string): Promise<void> => {
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
                uploadImage,
                bookmarkRecipe,
                deleteRecipe,
            }}
        >
            {children}
        </RecipeContext.Provider>
    )
}
