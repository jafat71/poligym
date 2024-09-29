

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
    width: number
}

const OnboardingItem = ({width}:Props) => {
    return (
        <View style={[styles.container, { width }]}>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c1c1c', 
        padding: 13,
        shadowColor: '#1c1c1c', 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5.65,
        elevation: 8,
    },
});

export default OnboardingItem;
