

import { ActivityIndicator, View } from 'react-native';
import MainLogoCustomComponent from '../ui/common/logo/mainLogo';

const Loading = () => {

    return (
        <View className={`bg-blueEPN-500 flex-1 flex-col items-center justify-center z-10`}>
            <MainLogoCustomComponent height='100' width='100' principal='#FF5722' />
            <ActivityIndicator size={'large'} color={'#FF5722'} />
        </View>
    );
};

export default Loading;
