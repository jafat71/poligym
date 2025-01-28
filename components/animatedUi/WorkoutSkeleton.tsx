import { View, Text, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const WorkoutSkeleton = () => {
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
    <View className="rounded-lg overflow-hidden">
      <LinearGradient
        colors={[
          'rgba(0,85,249,0.95)',
          'rgba(0,85,249,0.8)',
          'rgba(0,85,249,0.95)'
        ]}
        className="absolute w-full h-full"
      />
      <View className="p-4 pb-3">
        <View className={`h-6 w-full bg-gray-100 rounded mb-4 opacity-10 overflow-hidden`}>
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

        <View className={`h-6 w-full bg-gray-100 rounded mb-4 opacity-10 overflow-hidden`}>
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

        <View className={`h-6 w-full bg-gray-100 rounded mb-4 opacity-10 overflow-hidden`}>
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

        <View className="flex flex-row justify-between items-center mb-2">
          <View className={`h-6 w-1/4 bg-gray-100 rounded opacity-10 overflow-hidden`}>
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
          <View className={`h-24 w-1/4 bg-gray-100 rounded-full opacity-10 -translate-y-4 overflow-hidden`}>
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

        <View className={`h-6 w-1/2 bg-gray-100 rounded opacity-10 overflow-hidden`}>
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

        <View className={`h-6 w-full bg-gray-100 rounded opacity-10 overflow-hidden`}>
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

        <View className={`flex flex-row items-center justify-between`}>
          <View className={`h-20 w-1/4 bg-gray-100 rounded-full opacity-10 overflow-hidden`}>
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
          <View className={`h-6 w-1/4 bg-gray-100 rounded opacity-10 overflow-hidden`}>
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
  );
};

export default WorkoutSkeleton;