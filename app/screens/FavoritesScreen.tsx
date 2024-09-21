import React, {FC, useState} from "react";
import {Dimensions, FlatList, ImageBackground, StyleSheet, Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecipeSmallCard } from "@/app/components/cards/RecipeSmallCard";
import { recipes } from "@/app/constants/recipesTestData";
import {Recipe} from "@/app/models/Recipe";
import {SearchbarRecipes} from "@/app/components/SearchbarRecipes";

const cardMargin = 10
const cardWidth = (Dimensions.get('window').width / 2) - (cardMargin * 2)

export const FavoritesScreen: FC = () => {
    const favRecipes = recipes.filter( item => item.favorite === true )
    const [data, setData] = useState<Recipe[]>(favRecipes)

    const handleSearch = (query: string) => {
        setData(favRecipes.filter(item => item.title.toLowerCase().includes(query.toLowerCase())))
    }

    return (
        <ImageBackground
            source={require("@/assets/images/background.jpg") }
            style={ styles.background }
        >
            <View style={styles.overlay} />
            <SafeAreaView style={styles.main}>
                { recipes.length >= 1 ? (
                    <View style={styles.container}>
                        <SearchbarRecipes onSearch={ handleSearch }/>
                        <FlatList
                            data={ data }
                            renderItem={({ item }) => <RecipeSmallCard recipe={ item } width={ cardWidth } /> }
                            keyExtractor={ item => item.id.toString() }
                            numColumns={ 2 }
                            columnWrapperStyle={ styles.row }
                            showsVerticalScrollIndicator={ false }
                        />
                    </View>
                ) : (
                    <Text style={ styles.noData }>No recipes found.</Text>
                )}
            </SafeAreaView>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 10
    },
    background: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
        flex: 1
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
        opacity: 0.4,
    },
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: "transparent",
        opacity: 1
    },
    searchBar: {
        backgroundColor: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 30,
        borderWidth: 0.5,
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: cardMargin,
    },
    noData: {
        fontSize: 16,
    }
})
