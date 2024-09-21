import React, {FC, useEffect, useState} from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {IconButton, TouchableRipple} from "react-native-paper";
import {RecipeCardProps} from "@/app/models/ScreenProps";
import { useNavigation } from "@react-navigation/native";
import {NavigationProp} from "@/types";

export const RecipeSmallCard: FC<RecipeCardProps> = ({ recipe, width }) => {
    const navigation = useNavigation<NavigationProp>()

    const [isFavorite, setIsFavorite] = useState<boolean>( recipe.favorite || false )

    const handleRecipePress = () => {
        navigation.navigate('RecipeDetailsScreen', recipe)
    }

    const handleFavorite = () => {
        setIsFavorite(!isFavorite)
        // TODO: Update recipe via API
    }

    useEffect(() => {}, [isFavorite])

    return (
        <TouchableRipple
            onPress={handleRecipePress}
            rippleColor="lightgray"
            borderless={true}
        >
            <View style={[styles.recipe, { width: width}]}>
                <IconButton
                    icon= { isFavorite ? "heart" : "heart-outline" }
                    mode="contained"
                    iconColor={ isFavorite ? "#e5b85b" : "black" }
                    size={ 30 }
                    style={ styles.icon }
                    onPress={ handleFavorite }
                />
                <Image
                    source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}images/${recipe.image}` }}
                    style={ styles.image }
                />
                <Text style={ styles.title }> { recipe.title } </Text>
            </View>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    recipe: {
        flex: 1,
        height: 200,
        padding: 16,
        marginVertical: 8,
        backgroundColor: "#FFF",
        borderRadius: 10,
        elevation: 5,
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "70%",
        borderRadius: 10,
        resizeMode: "cover",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
        color: "#333",
        textAlign: "center",
    },
    icon: {
        zIndex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        borderRadius: 50,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    }
})
