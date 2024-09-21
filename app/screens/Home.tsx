import React, { FC } from "react";
import { HomeScreenProps } from "@/app/models/ScreenProps";
import {BottomTabs} from "@/app/components/BottomTabs";
import {StatusBar} from "expo-status-bar";

export const Home: FC<HomeScreenProps> = () => {
    return (
        <>
            <StatusBar backgroundColor="#98948F" />
            <BottomTabs />
        </>
    )
}
