import React, { FC, useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '@/types'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Dialog, IconButton, Portal } from 'react-native-paper'
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
    favorite = false,
    onFavorite,
}) => {
    const navigation = useNavigation<NavigationProp>()
    const { deleteRecipe } = useContext(RecipeContext)
    const { showSnackbar } = useContext(SnackbarContext)

    // Dialog
    const [visible, setVisible] = useState<boolean>(false)
    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

    // Favorite
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const handleFavorite = () => {
        setIsFavorite(!isFavorite)
        onFavorite && onFavorite(!isFavorite)
    }

    const handleRemove = () => {
        recipe &&
            recipe.id &&
            deleteRecipe(recipe.id).then(r => {
                console.log('Recipe deleted:', r)
                hideDialog()
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
            {favorite && (
                <IconButton
                    icon={isFavorite ? 'heart' : 'heart-outline'}
                    onPress={handleFavorite}
                    mode="contained"
                    iconColor={'black'}
                    containerColor={colors.primary}
                />
            )}

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
                    onPress={showDialog}
                    mode={'contained'}
                    iconColor={'black'}
                    containerColor={colors.primary}
                />
            )}
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Delete Recipe</Dialog.Title>
                    <Dialog.Content>
                        <Text>Are you sure you want to delete this recipe?</Text>
                    </Dialog.Content>
                    <Dialog.Actions style={styles.actions}>
                        <Button
                            mode="contained"
                            onPress={hideDialog}
                            labelStyle={styles.buttonText}
                            style={[styles.dialogButton, { backgroundColor: colors.fourth }]}
                        >
                            No
                        </Button>
                        <Button
                            mode="contained"
                            onPress={handleRemove}
                            labelStyle={styles.buttonText}
                            style={[styles.dialogButton, { backgroundColor: colors.fifth }]}
                        >
                            Yes
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        elevation: 8,
    },
    dialogButton: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 30,
        justifyContent: 'center',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})
