import CustomListEmptyComponent from "@/components/ui/common/flatlists/CustomListEmptyComponent";
import SelfPost from "@/components/ui/social/SelfPost";
import { useNavigationFlowContext } from "@/context/NavFlowContext";
import { useTheme } from "@/context/ThemeContext";
import { SocialPost } from "@/types/interfaces/entities/post";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function Public() {

    const { isDark } = useTheme()
    const [refreshing, setRefreshing] = useState(false)
    const { userPosts } = useNavigationFlowContext()

    const [posts, setPosts] = useState<SocialPost[]>([])

    useEffect(() => {
        setPosts([...userPosts])
    }, [userPosts])         

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
                data={posts.filter(post => post.publico)}
                renderItem={({ item }) => <SelfPost {...item} />}
                keyExtractor={(item, index) => `${item.id}-${index}`}
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
                ListEmptyComponent={
                <CustomListEmptyComponent 
                    isSearching={false} 
                    isFetchingNextPage={false} 
                    isError={false} 
                    hasNextPage={false} 
                    text="No tienes publicaciones aún. Completa una rutina y comparte tus logros!"
                    />}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </>

    );
}
