import { useTheme } from '@/context/ThemeContext'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'

const TrainingPlans = [
  {
    title: "Muscle Builder Pro",
    image: 'https://img.freepik.com/free-photo/kettlebell-fitness-still-life_23-2151739205.jpg?t=st=1728466010~exp=1728469610~hmac=85441626c8ab165db4563db4380656b72316ddf129d048b5963ece3680e56b91&w=740',
  },
  {
    title: "Fat Blaster Program",
    image: 'https://img.freepik.com/free-photo/serious-sportswoman-dark-studio-holding-weight_23-2147752861.jpg?t=st=1728467277~exp=1728470877~hmac=a2892e5a7f587f7fb1c81bdfa612ba039443c3fffcd25efc7538d139d06533a3&w=826',
  },
  {
    title: "Olympic Warrior",
    image: 'https://img.freepik.com/premium-photo/closeup-gym-dumbbells-floor-bokeh-red-blue-fitness-gymnasium-background-wallpaper-copy_1162810-11138.jpg?w=740',
  },
];

const Home = () => {
  const { isDark } = useTheme()
  return (
    <SafeAreaView className={`flex flex-1
      px-2 border-[1px] ${isDark ? "border-darkGray-400" : "border-darkGray-500"}  rounded-sm
      ${isDark ? "bg-darkGray-500" : "bg-white"} `}>

        <View className='flex flex-row items-center justify-between pb-2 '>
          <Text className={`text-xl  font-ralewayLight text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Selecciona tu plan de entrenamiento</Text>
        </View>


      <View className={`h-3/5 relative rounded-md`}>

        <Swiper
          dotColor={`${isDark ? "#66a3ff " : "#003666"}`}
        >
          {TrainingPlans.map((plan, index) => (
            <View key={index}
              className={`flex flex-1 rounded-md
              pl-4 pb-4 border-[1px] ${isDark ? "border-eBlue-300" : "border-eBlue-800"}  rounded-sm`}
            >
              <Image source={{ uri: plan.image }}
                resizeMode='cover'
                className="w-full h-full rounded-md mb-4 b opacity-30" />
              <View className='absolute items-end p-1'>
                <Text className={`text-7xl font-bold break-words 
                  mb-2 ${isDark ? "text-white" : "text-darkGray-500"} `}>
                  {plan.title}
                </Text>
              </View>

            </View>
          ))}
        </Swiper>
      </View>




    </SafeAreaView>
  )
}

export default Home