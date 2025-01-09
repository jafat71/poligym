import Loading from '@/components/animatedUi/Loading'
import Post, { ComunityPost } from '@/components/ui/social/Post'
import { useTheme } from '@/context/ThemeContext'
import { getAllPostsFromDatabase } from '@/lib/postapi'
import { queryClient } from '@/lib/queryClient/queryClient'
import { SocialPost } from '@/types/interfaces/entities/post'
import { mapApiPostToPost } from '@/types/mappers'
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useCallback, useState, useEffect } from 'react'
import { FlatList, RefreshControl, View, Text } from 'react-native'

const Feed = () => {
  
  const { isDark } = useTheme()
  const [refreshing, setRefreshing] = useState(false)
  const [comunityPosts, setComunityPosts] = useState<SocialPost[]>([])

  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['comunityPosts', 'infinite'],
    initialPageParam: 1,
    staleTime: 60 * 60 * 1000, // 1 hora
    queryFn: async ({ pageParam = 1 }) => {
        const response = await getAllPostsFromDatabase(pageParam)
        if (response.status !== 200) {
            throw new Error(response.error)
        }
        const posts = mapApiPostToPost(response.data)
        posts.forEach(post => {
            queryClient.setQueryData(['comunityPosts', post.id], post)
        })
        return { posts: posts.filter(p => !p.oculto), meta: response.meta }
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPage = (lastPage.meta?.page ?? 0) + 1
      return nextPage <= (lastPage.meta?.lastPage ?? 0) ? nextPage : undefined
    },
  })

useEffect(() => {
    if (data) {
        const allPosts = data.pages.flatMap(page => page.posts)
        setComunityPosts(allPosts)
    }
}, [data])         

const onRefresh = useCallback(() => {
  setRefreshing(true)
  queryClient.invalidateQueries({ queryKey: ['comunityPosts', 'infinite'] })
  setTimeout(() => {
      setRefreshing(false)
  }, 2000)
}, [comunityPosts])

const loadMore = () => {
    if (hasNextPage && !isLoading) {
        fetchNextPage()
    }
}

if(isLoading && !data) return <Loading />  
if(isError) return <Text className={`text-center ${isDark ? "text-white" : "text-black"}`}>Error</Text>

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        className={`w-full px-2 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}
        contentContainerStyle={{ paddingTop: 0 }}
        data={comunityPosts as SocialPost[]}
        renderItem={({ item }) => (
          <ComunityPost {...item as SocialPost} />
        )}
        keyExtractor={(item: SocialPost) => item.id.toString()}
        keyboardDismissMode={'on-drag'}
        onEndReached={loadMore} 
        onEndReachedThreshold={0.25}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0059ff']}
            tintColor='#0059ff'
          />
        }
      />
    </View>
  )
}

export default Feed