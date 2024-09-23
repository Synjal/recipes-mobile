import React, { FC, useState } from 'react'
import { StyleSheet } from 'react-native'
import { SearchbarRecipesProps } from '@/app/models/props/ScreenProps'
import { Searchbar } from 'react-native-paper'

export const SearchBar: FC<SearchbarRecipesProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('')

    const handleSearchChange = (query: string) => {
        setSearchQuery(query)
        onSearch(query)
    }

    return (
        <Searchbar
            placeholder="Search recipes..."
            onChangeText={handleSearchChange}
            value={searchQuery}
            style={styles.searchBar}
        />
    )
}

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 30,
        borderWidth: 0.5,
    },
})
