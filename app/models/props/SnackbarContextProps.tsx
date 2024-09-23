import { ReactNode } from 'react'

export interface SnackbarProviderProps {
    children: ReactNode
}

export interface SnackbarContextProps {
    showSnackbar: (msg: string) => void
}

export const defaultSnackbarContextValue: SnackbarContextProps = {
    showSnackbar: () => {},
}
