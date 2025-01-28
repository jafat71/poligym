import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ExerciseInWorkoutSkeleton = () => {
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
    <View
      className={`
        flex flex-row items-center justify-start
        transition-all duration-300 px-2 h-24
        bg-eBlue-500 rounded-lg my-2
      `}
    >
      <View
        className={`p-4 justify-center bg-darkGray-200 h-full opacity-10 overflow-hidden`}
      >
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

      <View className={`flex-1 rounded-sm overflow-hidden`}>
        <View className={`px-4 py-0 flex-row items-center justify-between`}>
          <View className="flex-1 flex flex-col gap-y-2 p-2">
            <View className={`h-3 bg-gray-300 rounded opacity-10 overflow-hidden`}>
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
            <View className={`h-3 bg-gray-300 rounded opacity-10 overflow-hidden`}>
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
            <View className={`h-3 bg-gray-300 rounded opacity-10 overflow-hidden`}>
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
            <View className={`h-3 bg-gray-300 rounded opacity-10 overflow-hidden`}>
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

          <View className={`w-24 h-24 rounded-sm bg-darkGray-300 opacity-10 overflow-hidden`}>
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

export default ExerciseInWorkoutSkeleton;