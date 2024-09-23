import React, { FC, useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '@/types'
import { StyleSheet, View } from 'react-native'
import { IconButton, Portal, Snackbar, Switch } from 'react-native-paper'
import { HeaderProps } from '@/app/models/props/ScreenProps'
import { colors } from '@/app/constants/colors'
import { RecipeContext } from '@/app/context/RecipeContext'
import { SnackbarContext } from '@/app/context/SnackbarContext'

//TODO: Create an update screen or modal

export const Header: FC<HeaderProps> = ({
    recipe,
    back = true,
    add = false,
    remove = false,
    update = false,
    favoriteSwitch = false,
    onToggleFavorite,
}) => {
    const navigation = useNavigation<NavigationProp>()
    const { deleteRecipe } = useContext(RecipeContext)
    const { showSnackbar } = useContext(SnackbarContext)

    // Switch
    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false)
    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn)
        onToggleFavorite && onToggleFavorite(!isSwitchOn)
    }

    const handleRemove = () => {
        recipe &&
            recipe.id &&
            deleteRecipe(recipe.id).then(r => {
                console.log('Recipe deleted:', r)
                showSnackbar('The recipe has been deleted :(')
                navigation.navigate('RecipeScreen')
            })
    }

    return (
        <View style={styles.header}>
            {/* Back button */}
            {back && (
                <IconButton
                    icon={'arrow-left'}
                    onPress={() => navigation.goBack()}
                    mode={'contained-tonal'}
                    iconColor={'black'}
                    containerColor={colors.primary}
                />
            )}

            {/* Favorite switch */}
            {favoriteSwitch && <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={'white'} />}

            {/* Update button */}
            {update && (
                <IconButton
                    icon={'notebook-edit'}
                    onPress={() => console.log('Handle update recipe')}
                    mode={'contained'}
                    iconColor={'black'}
                    containerColor={colors.primary}
                />
            )}

            {/* Add button */}
            {add && (
                <IconButton
                    icon={'plus-circle-outline'}
                    onPress={() => navigation.navigate('AddScreen')}
                    mode={'contained'}
                    iconColor={'black'}
                    containerColor={colors.primary}
                />
            )}

            {/* Remove button */}
            {remove && (
                <IconButton
                    icon={'trash-can-outline'}
                    onPress={handleRemove}
                    mode={'contained'}
                    iconColor={'black'}
                    containerColor={colors.primary}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start',
        padding: 8,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        elevation: 8,
    },
})
