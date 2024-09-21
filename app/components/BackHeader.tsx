import React, {FC} from "react";
import {useNavigation} from "@react-navigation/native";
import {NavigationProp} from "@/types";
import {StyleSheet, View} from "react-native";
import {IconButton} from "react-native-paper";
import {BackHeaderProps} from "@/app/models/ScreenProps";

export const BackHeader: FC<BackHeaderProps> = ({ favorite }) => {
    const navigation = useNavigation<NavigationProp>()

    return (
        <View style={ styles.header }>
            <IconButton
                icon={'arrow-left'}
                onPress={ () => navigation.goBack() }
                mode={"contained"}
                iconColor={"black"}
                containerColor={"white"}
            />
            <IconButton
                icon={ favorite ? 'heart' : 'heart-outline' }
                onPress={ () => console.log("Handle favorite") }
                mode={ "contained" }
                iconColor={ "black" }
                containerColor={ "white" }
            />
            <IconButton
                icon={ 'notebook-edit'}
                onPress={ () => console.log("Handle edit recipe") }
                mode={ "contained" }
                iconColor={ "black" }
                containerColor={ "white" }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: "flex-start",
        padding: 8,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        marginBottom: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#98948F",
        elevation: 5,
    },
})
