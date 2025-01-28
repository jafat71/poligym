import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

const HorizontalFlatlistSkeleton = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateShimmer = () => {
      shimmerAnimation.setValue(0);
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => animateShimmer());
    };

    animateShimmer();
  }, []);

  const shimmerTranslateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View className="w-72 h-60 mr-2 my-2 mb-1 overflow-hidden rounded-lg">
      <LinearGradient
        colors={[
          'rgba(0,85,249,0.95)',
          'rgba(0,85,249,0.8)',
          'rgba(0,85,249,0.95)',
        ]}
        className="absolute w-full h-full"
      />
      <View className="z-30 flex-1">
        <View className="p-4 flex flex-row justify-between">
          <View className="flex flex-col w-4/5">
            <View className="h-3 bg-gray-300 rounded opacity-10 overflow-hidden">
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  transform: [{ translateX: shimmerTranslateX }],
                }}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(255, 255, 255, 0.5)', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1 }}
                />
              </Animated.View>
            </View>
            <View className="h-3 bg-gray-300 rounded opacity-10 overflow-hidden mt-2">
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  transform: [{ translateX: shimmerTranslateX }],
                }}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(255, 255, 255, 0.5)', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1 }}
                />
              </Animated.View>
            </View>
          </View>
          <View className="h-10 w-10 bg-gray-300 rounded opacity-10 overflow-hidden">
            <Animated.View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transform: [{ translateX: shimmerTranslateX }],
              }}
            >
              <LinearGradient
                colors={['transparent', 'rgba(255, 255, 255, 0.5)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
              />
            </Animated.View>
          </View>
        </View>
        <View className="flex-1 items-start justify-end p-4">
          <View className="flex-row items-start justify-between px-2 gap-x-2">
            <View className="h-10 w-10 bg-gray-300 rounded opacity-10 overflow-hidden">
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  transform: [{ translateX: shimmerTranslateX }],
                }}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(255, 255, 255, 0.5)', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1 }}
                />
              </Animated.View>
            </View>
            <View className="h-10 w-10 bg-gray-300 rounded opacity-10 overflow-hidden">
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  transform: [{ translateX: shimmerTranslateX }],
                }}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(255, 255, 255, 0.5)', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1 }}
                />
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HorizontalFlatlistSkeleton;