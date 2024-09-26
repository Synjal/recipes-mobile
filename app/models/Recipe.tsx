import { Ingredient } from '@/app/models/Ingredient'

export interface Recipe {
    id?: string
    title: string
    description?: string
    imageUrl?: string
    ingredients: Ingredient[]
    favorite?: boolean
}
