import { NavigationProp } from '@/types'
import { Recipe } from '@/app/models/Recipe'
import { Dispatch, SetStateAction } from 'react'

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

export interface HeaderProps {
    recipe?: Recipe
    back?: boolean
    update?: boolean
    favorite?: boolean
    onFavorite?: Dispatch<SetStateAction<boolean>>
    add?: boolean
    remove?: boolean
}
