import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';

interface SnapCarouselItemProps {
    item: number;
    isFocused: boolean;
    ITEM_HEIGHT: number;
}

export class SnapCarouselItem extends PureComponent<SnapCarouselItemProps> {
    render() {
        const { item, isFocused, ITEM_HEIGHT } = this.props;
        return (
            <View
                className={`justify-center items-center ${isFocused ? "scale-110" : "scale-100"}`}
                style={{ height: ITEM_HEIGHT }}
            >
                <Text
                    className={`${isFocused ? "text-white text-4xl font-bold" : "text-darkGray-100 text-xl"}`}
                >
                    {item}
                </Text>
            </View>
        );
    }
}