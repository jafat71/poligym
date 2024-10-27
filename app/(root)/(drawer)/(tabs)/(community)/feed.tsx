import SearchBar from '@/components/ui/common/searchbar/SearchBar'
import Post from '@/components/ui/social/Post'
import { socialPosts } from '@/constants'
import { useTheme } from '@/context/ThemeContext'
import { SocialPost } from '@/types/interfaces/entities/post'
import React, { useCallback, useState, useRef, useEffect } from 'react'
import { FlatList, RefreshControl, Animated, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const SEARCH_BAR_HEIGHT = 50 
type AnimatedFlatListType = Animated.AnimatedComponent<typeof FlatList<SocialPost>>
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as AnimatedFlatListType



const Feed = () => {
  const { isDark } = useTheme()
  const [refreshing, setRefreshing] = useState(false)
  const [posts, setPosts] = useState(socialPosts)

  const scrollY = useRef(new Animated.Value(0)).current
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, SEARCH_BAR_HEIGHT)
  const currentOpacity = useRef(1)

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

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  )

  const searchBarOpacity = diffClampScrollY.interpolate({
    inputRange: [0, SEARCH_BAR_HEIGHT],
    outputRange: [1, -1],
    extrapolate: 'identity',
  })


  const searchBarZIndex = searchBarOpacity.interpolate({
    inputRange: [0, 0.01],
    outputRange: [-1, 1],
    extrapolate: 'clamp',
  })

  
  useEffect(() => {
    searchBarOpacity.addListener(({ value }) => {
      //Toma valor de opacidad de la barra para controlar comportamineto al tapear
      currentOpacity.current = value
    })

    return () => {
      searchBarOpacity.removeAllListeners()
    }
  }, [searchBarOpacity])

  const handleSearchBarPress = () => {
    if (currentOpacity.current < 1) {
        scrollY.setValue(0)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: searchBarZIndex,
          opacity: searchBarOpacity,
        }}
      >
        <TouchableWithoutFeedback onPress={handleSearchBarPress}>
        <SearchBar
          placeholder='Buscar en Comunidad Poligym'
          onSearch={() => { }}
          onClear={() => { }}
          value=''
          onChangeText={() => { }}
          isVisible={true}
          />
        </TouchableWithoutFeedback>
      </Animated.View>
      <AnimatedFlatList
        className={`w-full px-2 ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}`}
        contentContainerStyle={{ paddingTop: SEARCH_BAR_HEIGHT }}
        data={socialPosts}
        renderItem={({ item }) => (
          <Post {...item as SocialPost} />
        )}
        keyExtractor={(item: SocialPost) => item.id.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyboardDismissMode={'on-drag'}
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