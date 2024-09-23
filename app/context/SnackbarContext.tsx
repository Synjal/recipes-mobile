import React, { FC, ReactNode, createContext, useCallback, useState } from 'react'
import { ViewStyle } from 'react-native'
import { Portal, Snackbar } from 'react-native-paper'
import {
    defaultSnackbarContextValue,
    SnackbarContextProps,
    SnackbarProviderProps,
} from '@/app/models/props/SnackbarContextProps'

export const SnackbarContext = createContext<SnackbarContextProps>(defaultSnackbarContextValue)

export const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const showSnackbar = useCallback((msg: string) => {
        setMessage(msg)
        setVisible(true)
    }, [])

    const onDismissSnackbar = () => setVisible(false)

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Portal>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackbar}
                    duration={3000}
                    action={{
                        label: 'Dismiss',
                        onPress: () => {
                            onDismissSnackbar()
                        },
                    }}
                    elevation={5}
                >
                    {message}
                </Snackbar>
            </Portal>
        </SnackbarContext.Provider>
    )
}
