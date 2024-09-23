import React, { FC, useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { IconButton, TouchableRipple } from 'react-native-paper'
import { RecipeCardProps } from '@/app/models/props/ScreenProps'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '@/types'
import { colors } from '@/app/constants/colors'
import { RecipeContext } from '@/app/context/RecipeContext'

export const RecipeCard: FC<RecipeCardProps> = ({ recipe, width }) => {
    const navigation = useNavigation<NavigationProp>()
    const { bookmarkRecipe } = useContext(RecipeContext)

    const [isFavorite, setIsFavorite] = useState<boolean>(recipe.favorite || false)

    const handleRecipePress = () => {
        navigation.navigate('RecipeDetailsScreen', recipe)
    }

    const handleFavorite = () => {
        setIsFavorite(!isFavorite)
        bookmarkRecipe(recipe).then(() => console.log('Recipe marked as favorite: ', recipe.favorite))
    }

    useEffect(() => {}, [isFavorite])

    return (
        <TouchableRipple onPress={handleRecipePress} rippleColor="lightgray" borderless={true}>
            <View style={[styles.recipe, { width: width }]}>
                <IconButton
                    icon={isFavorite ? 'heart' : 'heart-outline'}
                    mode="contained"
                    iconColor={isFavorite ? '#e5b85b' : 'black'}
                    size={30}
                    style={styles.icon}
                    onPress={handleFavorite}
                />
                <Image
                    source={{
                        uri: `${recipe.imageUrl}`,
                    }}
                    style={styles.image}
                />
                <Text style={styles.title}> {recipe.title} </Text>
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
        backgroundColor: colors.onPrimary,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '70%',
        borderRadius: 10,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    icon: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: 50,
        backgroundColor: colors.onPrimary,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
