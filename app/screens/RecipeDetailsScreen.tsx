import React, { FC, useContext, useState } from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Recipe } from '@/app/models/Recipe'
import { DataTable, IconButton, TextInput } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { Header } from '@/app/components/Header'
import * as ImagePicker from 'expo-image-picker'
import { RecipeContext } from '@/app/context/RecipeContext'

type RouteParams = Recipe

export const RecipeDetailsScreen: FC = () => {
    const route = useRoute()
    const recipe = route.params as RouteParams
    const ingredientsList = recipe.ingredients
    const { uploadImage, updateRecipe } = useContext(RecipeContext)

    console.log(recipe)

    // Image
    const [imgUrl, setImgUrl] = useState<string>(recipe.image || '')
    const handleImageChange = async () => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!image.canceled) {
            recipe.image = image.assets[0].uri
            await uploadImage(recipe)
            setImgUrl(image.assets[0].uri)
        }
    }

    // Title
    const [isEditTitle, setIsEditTitle] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(recipe.title)
    const editTitle = () => {
        setIsEditTitle(!isEditTitle)
    }

    const handleTitleChange = async () => {
        recipe.title = title
        await updateRecipe(recipe)
        editTitle()
    }

    //description
    const [isEditDescription, setIsEditDescription] = useState<boolean>(false)
    const [description, setDescription] = useState<string>(recipe.description || '')
    const handleDescriptionChange = async () => {
        const newRecipe = recipe
        newRecipe.description = description
        await updateRecipe(newRecipe)
    }

    // Ingredients
    const [isEditIngredients, setIsEditIngredients] = useState<boolean>(false)
    const handleIngredientsChange = async () => {}

    // Checked ingredients
    const [checkIngredients, setCheckIngredients] = useState<string[]>([])
    const toggleIngredientCheck = (name: string) => {
        setCheckIngredients(prev => (prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]))
    }

    return (
        <ImageBackground source={require('@/assets/images/recipeBackground.jpg')} style={styles.background}>
            <View style={styles.overlay} />
            <Header recipe={recipe} remove />
            <ScrollView style={styles.main}>
                <View style={styles.imageContainer}>
                    <IconButton
                        icon={'image-edit-outline'}
                        iconColor="black"
                        size={40}
                        style={styles.icon}
                        onPress={handleImageChange}
                    />
                    <Image
                        source={{
                            uri: imgUrl,
                        }}
                        style={styles.image}
                    />
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)']} style={styles.gradient} />
                </View>
                <View style={styles.data}>
                    <View style={styles.titleRow}>
                        {isEditTitle ? (
                            <TextInput style={styles.title} value={title} onChangeText={setTitle} />
                        ) : (
                            <Text style={styles.title}>{title}</Text>
                        )}
                        {isEditTitle ? (
                            <>
                                <IconButton icon={'check'} iconColor="black" size={24} onPress={handleTitleChange} />
                                <IconButton icon={'close'} iconColor="black" size={24} onPress={editTitle} />
                            </>
                        ) : (
                            <IconButton icon={'pencil-outline'} iconColor="black" size={24} onPress={editTitle} />
                        )}
                    </View>
                    {recipe.description && <Text style={styles.description}>{recipe.description}</Text>}
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title textStyle={styles.headerTitle}>Ingredients</DataTable.Title>
                            <DataTable.Title numeric textStyle={styles.headerTitle}>
                                Quantity
                            </DataTable.Title>
                            <DataTable.Title numeric textStyle={styles.headerTitle}>
                                Unit
                            </DataTable.Title>
                        </DataTable.Header>
                        {ingredientsList.map(ingredient => (
                            <DataTable.Row key={ingredient.name} onPress={() => toggleIngredientCheck(ingredient.name)}>
                                <DataTable.Cell>
                                    <Text
                                        style={{
                                            textDecorationLine: checkIngredients.includes(ingredient.name)
                                                ? 'line-through'
                                                : 'none',
                                            color: checkIngredients.includes(ingredient.name) ? '#adadad' : 'black',
                                        }}
                                    >
                                        {ingredient.name}
                                    </Text>
                                </DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text
                                        style={{
                                            textDecorationLine: checkIngredients.includes(ingredient.name)
                                                ? 'line-through'
                                                : 'none',
                                            color: checkIngredients.includes(ingredient.name) ? '#adadad' : 'black',
                                        }}
                                    >
                                        {ingredient.quantity}
                                    </Text>
                                </DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text
                                        style={{
                                            textDecorationLine: checkIngredients.includes(ingredient.name)
                                                ? 'line-through'
                                                : 'none',
                                            color: checkIngredients.includes(ingredient.name) ? '#adadad' : 'black',
                                        }}
                                    >
                                        {ingredient.unit}
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: 40,
    },
    background: {
        width: '100%',
        height: '100%',
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
        width: '100%',
        height: 250,
        resizeMode: 'cover',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    icon: {
        zIndex: 1,
        position: 'absolute',
        top: -8,
        right: -8,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    data: {
        marginHorizontal: 24,
        marginBottom: 32,
        elevation: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#FFF',
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        marginBottom: 24,
        textAlign: 'center',
        color: '#adadad',
        fontStyle: 'italic',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 14,
    },
})
