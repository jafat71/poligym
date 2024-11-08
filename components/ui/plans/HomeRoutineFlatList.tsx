import React, { useRef } from 'react'
import { Animated } from 'react-native'
import PlanSmallCard from './PlanSmallCard';

interface Props {
    data: Animated.WithAnimatedObject<ArrayLike<any>> | null | undefined
}

export const HomeRoutineFlatlist = ({ data }: Props) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <Animated.FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            className='my-1 px-1'
            data={data}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => {
                const inputRange = [
                    (index - 1) * 300,
                    index * 300,
                    (index + 1) * 300
                ];

                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.9, 1, 0.9],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        style={{
                            transform: [{ scale }],
                        }}
                    >
                        <PlanSmallCard
                            key={item.id}
                            {...item}
                        />
                    </Animated.View>
                );
            }}
            keyExtractor={(item, index) => item.title + "" + index}
            snapToInterval={300}
            decelerationRate="fast"
        />
    )
}