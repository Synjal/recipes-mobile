import React, { FC, useEffect } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { SplashScreenProps } from '@/app/models/props/ScreenProps'

export const SplashScreen: FC<SplashScreenProps> = ({ navigation }) => {
    useEffect(() => {
        const initializeApp = async () => {
            navigation.navigate('RecipeScreen')
        }
        const timeout = setTimeout(initializeApp, 3000)
        return () => clearTimeout(timeout)
    }, [navigation])

    return <ImageBackground source={require('../../assets/images/splash.jpg')} style={styles.background} />
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
})
