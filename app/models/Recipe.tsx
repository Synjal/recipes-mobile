import { Ingredient } from '@/app/models/Ingredient'

export interface Recipe {
    id?: string
    title: string
    description?: string
    image?: string
    ingredients: Ingredient[]
    favorite?: boolean
}
