import React, { FC, useContext, useEffect } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { SplashScreenProps } from '@/app/models/props/ScreenProps'
import { RecipeContext } from '@/app/context/RecipeContext'

export const SplashScreen: FC<SplashScreenProps> = ({ navigation }) => {
    const { getAllRecipes } = useContext(RecipeContext)

    useEffect(() => {
        const initializeApp = async () => {
            getAllRecipes()
            navigation.navigate('RecipeScreen')
        }
        const timeout = setTimeout(initializeApp, 3000)
        return () => clearTimeout(timeout)
    }, [navigation])

    return <ImageBackground source={require('../../assets/images/splash.jpeg')} style={styles.background} />
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
})
