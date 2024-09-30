

import { ActivityIndicator, View } from 'react-native';

const Loading = () => {

    return (
        <View className='bg-eBlue-500 flex-1 justify-center items-center'>
            <ActivityIndicator
                color="#1c1c1c"
                size={'large'}
            />
        </View>
    );
};

export default Loading;
