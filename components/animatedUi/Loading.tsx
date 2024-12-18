

import { ActivityIndicator, StatusBar, View } from 'react-native';
import MainLogoCustomComponent from '../ui/common/logo/mainLogo';

const Loading = () => {

    console.log("LOADING RUNNING")
    return (
        <View className={`bg-eBlue-500 flex-1 flex-col items-center justify-center z-10`}>
            <StatusBar  backgroundColor='#0055f9' />
            <MainLogoCustomComponent height='100' width='100' principal='#fff' />
            <ActivityIndicator size={'large'} color={'#fff'} />
        </View>
    );
};

export default Loading;
