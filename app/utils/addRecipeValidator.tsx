import * as Yup from "yup"
import {Unit} from "@/app/models/Unit";

export const addRecipeValidator = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    image: Yup.string(),
    ingredients: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required("Ingredient name is required"),
            quantity: Yup.number().required("Quantity is required").positive("Must be positive"),
            unit: Yup.string().oneOf(Object.values(Unit)).required("Unit is required"),
        })
    )
})
