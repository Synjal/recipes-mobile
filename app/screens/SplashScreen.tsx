import React, { FC, useEffect } from "react"
import { StyleSheet, ImageBackground } from 'react-native'
import { SplashScreenProps } from "@/app/models/ScreenProps";

export const SplashScreen: FC<SplashScreenProps> = ({ navigation }) => {

    useEffect(() => {
        const initializeApp = async () => {
            navigation.navigate('Home')
        }
        const timeout = setTimeout(initializeApp, 3000)
        return () => clearTimeout(timeout)
    }, [navigation])

    return (
        <ImageBackground source={require('../../assets/images/splash.jpg')} style={ styles.background }  />
    )
}

const styles = StyleSheet.create({

    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
})
