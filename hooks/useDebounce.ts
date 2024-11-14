import { useEffect, useRef } from "react";
import debounce from 'lodash/debounce';

interface UseDebounceProps {
    setSearchQuery: (query: string) => void;
    setIsSearching: (isSearching: boolean) => void;
    setSearchInput: (input: string) => void;
}

export const useDebounce = ({setSearchQuery, setIsSearching, setSearchInput}: UseDebounceProps) => {
    
    const debouncedSearchRef = useRef(
        debounce((query: string) => {
            setSearchQuery(query);
            setIsSearching(false);
        }, 500)
    ).current;

    const handleSearchChange = (text: string) => {
        setSearchInput(text);
        setIsSearching(true);
        debouncedSearchRef(text);
    };

    useEffect(() => {
        return () => {
            debouncedSearchRef.cancel();
        };
    }, [debouncedSearchRef]);

    return {
        handleSearchChange
    };
}