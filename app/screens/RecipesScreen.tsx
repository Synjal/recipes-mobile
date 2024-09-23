import React, { FC, useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RecipeCard } from '@/app/components/cards/RecipeCard'
import { Recipe } from '@/app/models/Recipe'
import { SearchBar } from '@/app/components/SearchBar'
import { Header } from '@/app/components/Header'
import { colors } from '@/app/constants/colors'
import { StatusBar } from 'expo-status-bar'
import { RecipeContext } from '@/app/context/RecipeContext'

const cardMargin = 10
const cardWidth = Dimensions.get('window').width / 2 - cardMargin * 2

export const RecipesScreen: FC = () => {
    const { recipes } = useContext(RecipeContext)
    const favRecipes = recipes.filter(item => item.favorite === true)

    const [showFavorites, setShowFavorites] = useState<boolean>(false)
    const [data, setData] = useState<Recipe[]>(recipes)

    const handleSearch = (query: string) => {
        setData(
            (showFavorites ? favRecipes : recipes).filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()),
            ),
        )
    }

    useEffect(() => {
        setData(showFavorites ? favRecipes : recipes)
    }, [recipes, showFavorites])

    return (
        <ImageBackground source={require('@/assets/images/background.jpg')} style={styles.background}>
            <StatusBar backgroundColor={colors.primary} />
            <View style={styles.overlay} />
            <SafeAreaView style={styles.main}>
                <Header back={false} favoriteSwitch onToggleFavorite={setShowFavorites} add />
                <View style={styles.container}>
                    <SearchBar onSearch={handleSearch} />
                    {data.length >= 1 ? (
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <RecipeCard recipe={item} width={cardWidth} />}
                            keyExtractor={item => item.title.toString()}
                            numColumns={2}
                            columnWrapperStyle={styles.row}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <Text style={styles.noData}>
                            {showFavorites ? "You don't have any favorite recipes yet !" : 'No recipes found'}
                        </Text>
                    )}
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 10,
    },
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
        opacity: 0.4,
    },
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: 'transparent',
        opacity: 1,
        marginTop: 56,
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: cardMargin,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noData: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.33,
        textTransform: 'uppercase',
    },
})
