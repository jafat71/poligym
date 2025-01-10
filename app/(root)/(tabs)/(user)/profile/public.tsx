import CustomListEmptyComponent from "@/components/ui/common/flatlists/CustomListEmptyComponent";
import SelfPost from "@/components/ui/social/SelfPost";
import { useNavigationFlowContext } from "@/context/NavFlowContext";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { getAllPostFromUser } from "@/lib/postapi";
import { queryClient } from "@/lib/queryClient/queryClient";
import { SocialPost } from "@/types/interfaces/entities/post";
import { mapApiPostToPost } from "@/types/mappers";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function Public() {

    const { isDark } = useTheme()
    const { loggedUserInfo } = useUser()
    const { userPosts, setUserPosts } = useNavigationFlowContext()
    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['userPosts'],
        queryFn: async () => {
            const response = await getAllPostFromUser(loggedUserInfo?.id!)
            const posts = mapApiPostToPost(response.data)
            posts.forEach(post => {
                queryClient.setQueryData(['userPosts', post.id], post)
            })
            return posts.filter(p=>p.oculto==false)
        },
        initialData: userPosts
    })

    useEffect(() => {
        if (data) {
            setUserPosts([...data!])
        }
    }, [data])         

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        queryClient.invalidateQueries({ queryKey: ['userPosts'] })
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }, [userPosts])

    if (isLoading) return <Text className={`text-center text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"}`}>Cargando...</Text>
    if (isError) return <Text className={`text-center text-lg font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"}`}>Error al cargar las publicaciones</Text>
    
    return (
        <>

            <FlatList
                className={`w-full px-2 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}
                data={userPosts.filter(post => post.publico)}
                renderItem={({ item }) => <SelfPost {...item} />}
                keyExtractor={(item, index) => `${item.id}-${index}`}
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
