import CustomListEmptyComponent from "@/components/ui/common/flatlists/CustomListEmptyComponent";
import SelfPost from "@/components/ui/social/SelfPost";
import { socialPosts, UserPosts } from "@/constants";
import { useNavigationFlowContext } from "@/context/NavFlowContext";
import { useTheme } from "@/context/ThemeContext";
import { SocialPost } from "@/types/interfaces/entities/post";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function Private() {

    const { isDark } = useTheme()
    const [refreshing, setRefreshing] = useState(false)
    const [posts, setPosts] = useState<SocialPost[]>([])

    const { userPosts } = useNavigationFlowContext()

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
        <FlatList
            className={`w-full px-2 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}
            data={posts.filter(post => !post.publico)}
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
            ListEmptyComponent={
                <View className="justify-center items-center ">
                    <CustomListEmptyComponent
                        isSearching={false}
                        isFetchingNextPage={false}
                        isError={false}
                        hasNextPage={false}
                        text="No tienes publicaciones privadas. 
    Tus publicaciones se comparten automáticamente en la comunidad de POLIGYM.
    Si deseas ocultar una publicación, 
    selecciona el icono de 3 puntos y establécelo como oculto"
                    />
                </View>
            }
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
    );
}
