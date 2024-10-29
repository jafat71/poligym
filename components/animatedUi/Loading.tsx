

import { ActivityIndicator, View } from 'react-native';
import MainLogoCustomComponent from '../ui/common/logo/mainLogo';

const Loading = () => {

    return (
        <View className={`bg-eBlue-500 flex-1 flex-col items-center justify-center`}>
            <MainLogoCustomComponent height='100' width='100' principal='#fff' />
            <ActivityIndicator size={'large'} color={'#fff'} />
        </View>
    );
};

export default Loading;
