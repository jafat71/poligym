import SearchBar from "@/components/ui/common/searchbar/FloatingSearchBar";
import SelfPost from "@/components/ui/social/SelfPost";
import { socialPosts } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function Public() {

    const { isDark } = useTheme()
    const [refreshing, setRefreshing] = useState(false)
    const [posts, setPosts] = useState(socialPosts)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        //TODO: Fetch Posts User
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }, [posts])

    const onEndReached = () => {
        // TODO: PREFETCH INFINITE SCROLL
        console.log('End of list reached')
    }

    return (
        <>

            <FlatList
                className={`w-full px-2 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}
                data={socialPosts.filter(post => post.publico)}
                renderItem={({ item }) => <SelfPost {...item} />}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#0059ff']}
                        tintColor='#0059ff'
                    />
                }
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </>

    );
}
