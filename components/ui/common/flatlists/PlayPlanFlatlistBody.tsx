import { WorkoutAPI } from '@/types/interfaces/entities/plan'
import React, { useRef } from 'react'
import { Animated } from 'react-native'
import RoutineSmallCard from '../../routines/RoutineSmallCard'

interface Props {
    data: WorkoutAPI[]
}

export const PlayPlanFlatlistBody = ({ data }: Props) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <>
            <Animated.FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                className='my-2'
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
                                opacity
                            }}
                        >
                            <RoutineSmallCard routine={item} />
                        </Animated.View>
                    );
                }}
                keyExtractor={(item, index) => item.name + "" + index}
                snapToInterval={300}
                decelerationRate="fast"
            />
            
        </>
    )
}