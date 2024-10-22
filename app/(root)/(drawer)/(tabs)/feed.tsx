import SearchBar from '@/components/ui/common/searchbar/SearchBar'
import Post from '@/components/ui/social/Post'
import { socialPosts } from '@/constants'
import { useTheme } from '@/context/ThemeContext'
import React, { useCallback, useState } from 'react'
import { FlatList, RefreshControl} from 'react-native-gesture-handler'

const Feed = () => {
  const { isDark } = useTheme()
  const [refreshing, setRefreshing] = useState(false)
  const [posts, setPosts] = useState(socialPosts)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    //TODO: Fetch Posts Comunidad
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
      <SearchBar 
        placeholder='Buscar en Comunidad Poligym' 
        onSearch={() => {}}
        onClear={() => {}}
        value=''
        onChangeText={() => {}}
        />
      <FlatList
        className={`w-full px-2 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}
        data={socialPosts}
        renderItem={({ item }) => <Post {...item} />}
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

  )
}

export default Feed