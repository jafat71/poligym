import React, { useRef } from 'react'
import { Animated } from 'react-native'
import PlanCard from './PlanCard';
import { Level } from './PlanConstants';

interface Props {
    data: Animated.WithAnimatedObject<ArrayLike<any>> | null | undefined
}

export const HomePlanFlatlist = ({ data }: Props) => {

    const scrollX = useRef(new Animated.Value(0)).current;
    return (
        <>
            <Animated.FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-1 my-2"
                data={data}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * 300,
                        index * 300,
                        (index + 1) * 200
                    ];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.85, 1, 0.85],
                        extrapolate: 'clamp',
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.7, 1, 0.7],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            style={{
                                transform: [{ scale }],
                                opacity,
                            }}
                        >
                            <PlanCard
                                key={item.title}
                                {...item}
                                level={item.level as Level}
                            />

                        </Animated.View>
                    );
                }}
                keyExtractor={(item, index) => item.title + "" + index}
                snapToInterval={300}
                decelerationRate="normal"
            />
        </>
    )
}
