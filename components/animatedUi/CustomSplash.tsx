

import { ActivityIndicator, View } from 'react-native';
import MainLogoCustomComponent from '../ui/common/logo/mainLogo';

const CustomSplash = () => {

    return (
        <View className={`bg-eBlue-500 flex-1 flex-col items-center justify-center z-10`}>
            <MainLogoCustomComponent height='100' width='100' principal='#fff' />
        </View>
    );
};

export default CustomSplash;
