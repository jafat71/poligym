import React, { useRef } from 'react'
import { ActivityIndicator, Animated, View } from 'react-native'
import HorizontalFlatlistSkeleton from '@/components/animatedUi/HorizontalFlatlistSkeleton';
import RoutinePlanSmallCard from './RoutineInPlanSmallCard';
import RoutineSmallCard from './RoutineSmallCard';

interface Props {
    data: Animated.WithAnimatedObject<ArrayLike<any>> | null | undefined
    infoSetted: boolean
    isUserCurrentPlan: boolean
    weekIndex: number
    planId: number
    workoutCompleted: string
}

export const WorkoutsInPlanFlatList = ({ data, infoSetted, isUserCurrentPlan, weekIndex, planId, workoutCompleted }: Props) => {
    if(!data) return null
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <>  
        {
            infoSetted && data && data.length > 0 ? (
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
                            {isUserCurrentPlan ? (
                                <RoutinePlanSmallCard
                                    key={item.id}   
                                    routine={item}
                                    weekIndex={weekIndex}
                                    planProgressId={planId}
                                    workoutCompleted={workoutCompleted}
                                />
                            ) : (
                                <RoutineSmallCard
                                    key={item.id}
                                    {...item}
                                />
                            )}
                        </Animated.View>
                    );
                }}
                keyExtractor={(item, index) => item.title + "" + index}
                snapToInterval={300}
                decelerationRate="fast"
            />
            ) :(
                <HorizontalFlatlistSkeleton/>
            )
        }
            
        
        </>
    )
}