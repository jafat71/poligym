import CustomListEmptyComponent from "@/components/ui/common/flatlists/CustomListEmptyComponent";
import SelfPost from "@/components/ui/social/SelfPost";
import { useNavigationFlowContext } from "@/context/NavFlowContext";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { getAllPostFromUser } from "@/lib/postapi";
import { SocialPost } from "@/types/interfaces/entities/post";
import { mapApiPostToPost } from "@/types/mappers";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function Public() {

    const { isDark } = useTheme()
    const { loggedUserInfo } = useUser()
    const [refreshing, setRefreshing] = useState(false)
    const { userPosts } = useNavigationFlowContext()

    const [posts, setPosts] = useState<SocialPost[]>([])

    const { data, isLoading, isError } = useQuery({
        queryKey: ['userPosts'],
        queryFn: async () => {
            const response = await getAllPostFromUser(loggedUserInfo?.id!)
            return mapApiPostToPost(response.data)
        },
    })

    console.log('data', data)

    useEffect(() => {
        setPosts([...data!])
    }, [data])         

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

    if (isLoading) return <Text className={`text-center text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"}`}>Cargando...</Text>

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
