import React, {FC, useEffect, useState} from "react";
import {Image, StyleSheet, View, Text, Animated, ImageBackground} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useRoute} from "@react-navigation/native";
import {Recipe} from "@/app/models/Recipe";
import {DataTable} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {BackHeader} from "@/app/components/BackHeader";

type RouteParams = Recipe

export const RecipeDetailsScreen: FC = () => {
    const route = useRoute()
    const recipe = route.params as RouteParams
    const ingredientsList = recipe.ingredients

    const [checkIngredients, setCheckIngredients] = useState<string[]>([])
    const toggleIngredientCheck = (name: string) => {
        setCheckIngredients(prev =>
            prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
        )
    }

    useEffect(() => {
        Animated.timing(new Animated.Value(0), {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
    }).start()
    }, [])

    return (
        <ImageBackground
            source={require("@/assets/images/recipeBackground.jpg") }
            style={ styles.background }
        >
            <View style={styles.overlay} />
            <SafeAreaView style={ styles.main }>
                <BackHeader favorite={ recipe.favorite }/>
                <View style={ styles.imageContainer }>
                    <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}images/${recipe.image}` }} style={ styles.image }/>
                    <LinearGradient
                        colors={ ['transparent', 'rgba(0,0,0,0.5)'] }
                        style={ styles.gradient }
                    />
                </View>
                <View style={ styles.data }>
                    <Text style={ styles.title }>{recipe.title}</Text>
                    { recipe.description && <Text style={ styles.description }>{recipe.description}</Text> }
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title textStyle={ styles.headerTitle }>Ingredients</DataTable.Title>
                            <DataTable.Title numeric textStyle={ styles.headerTitle }>Quantity</DataTable.Title>
                            <DataTable.Title numeric textStyle={ styles.headerTitle }>Unit</DataTable.Title>
                        </DataTable.Header>
                        { ingredientsList.map(ingredient => (
                            <DataTable.Row key={ingredient.name} onPress={ () => toggleIngredientCheck(ingredient.name) }>
                                <DataTable.Cell>
                                    <Text style={{
                                        textDecorationLine: checkIngredients.includes(ingredient.name) ? 'line-through' : 'none',
                                        color: checkIngredients.includes(ingredient.name) ? '#adadad' : 'black'
                                    }}>
                                        {ingredient.name}
                                    </Text>
                                </DataTable.Cell>
                                <DataTable.Cell numeric>{ingredient.quantity}</DataTable.Cell>
                                <DataTable.Cell numeric>
                                    {
                                        ingredient.unit === 'g'
                                            ? <MaterialCommunityIcon name={ 'weight-gram' } size={16} direction={'ltr'}/>
                                            : ingredient.unit
                                    }
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    background: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
        opacity: 0.7,
    },
    imageContainer: {
        marginHorizontal: 24,
        marginTop: 56,
        marginBottom: 0,
        elevation: 8,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    data: {
        marginHorizontal: 24,
        elevation: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: "#FFF",
        padding: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
        alignSelf: "center",
        letterSpacing: 1.2,
    },
    description: {
        fontSize: 16,
        marginBottom: 24,
        textAlign: "center",
        color: "#adadad",
        fontStyle: "italic",
    },
    headerTitle: {
        fontWeight: "bold",
        fontSize: 14,
    },
})
