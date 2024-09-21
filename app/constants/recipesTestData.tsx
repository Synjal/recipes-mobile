import {Recipe} from "@/app/models/Recipe";
import {Unit} from "@/app/models/Unit";

export const recipes: Recipe[] = [
    {
        id: 1,
        title: "test",
        image: "default_food.jpeg",
        ingredients: [
            {
                name: "test",
                quantity: 1,
                unit: Unit.g
            }
        ],
        favorite: false
    },
    {
        id: 2,
        title: "Poulet mayonnaise",
        description: "A ne réaliser qu'en cas d'extrême urgence de frigo vide",
        image: "default_food.jpeg",
        ingredients: [
            {
                name: "Poulet",
                quantity: 200,
                unit: Unit.g
            },
            {
                name: "Mayonnaise",
                quantity: 20,
                unit: Unit.g
            },
            {
                name: "Fromage",
                quantity: 100,
                unit: Unit.g
            }
        ],
        favorite: true
    },
    {
        id: 3,
        title: "test2",
        image: "default_food.jpeg",
        ingredients: [
            {
                name: "test2",
                quantity: 90,
                unit: Unit.cl
            }
        ],
        favorite: false
    },
]
