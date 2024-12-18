import WorkoutLoadingScreen from '@/components/animatedUi/WorkoutLoadingScreen';
import CTAButtonPrimary from '@/components/ui/common/buttons/CtaButtonPrimary';
import RadioButtonIconComponent from '@/components/ui/common/buttons/RadioButtonIcon';
import IconTextInputForm from '@/components/ui/common/form/IconTextInputForm';
import ImagePicker from '@/components/ui/common/image/ImagePicker';
import CustomSnackbar from '@/components/ui/common/snackbar/CustomSnackbar';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { updateUser } from '@/lib/api/userActions';
import { getEnumKeyByValue } from '@/lib/utils/getEnumKeyByValue';
import { validateFloatInput, validateNumericInput, validateUserInfo, validateZInput } from '@/lib/utils/validateAuthForm';
import { FITNESS_LEVEL, GENDER, GOAL, HAS_INJURY, User, USER_TYPE } from '@/types/interfaces/entities/user';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const EditProfile = () => {

    const [isLoading, setIsLoading] = useState(true);

    const opacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
    useEffect(() => {
        opacity.value = withTiming(1, { duration: 2500 });
    }, []);

    //Retraso para cargar adecuadamente data del contexto
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, [])

    const { isDark } = useTheme()
    const { loggedUserInfo, updateUserInfo, accessToken } = useUser()

    const [errors, setErrors] = useState<string[]>([]);

    const [updateUserState, setUpdateUserState] = useState<Partial<User>>(loggedUserInfo ?? {} as Partial<User>);

    const [tmbWeight, setTmbWeight] = useState<string>(updateUserState.weight?.toString() ?? "");
    const [tmbHeight, setTmbHeight] = useState<string>(updateUserState.height?.toString() ?? "");
    const genreValue = GENDER[updateUserState.gender as unknown as keyof typeof GENDER] || GENDER.MALE
    const [selectedGenre, setSelectedGenre] = useState<GENDER>(genreValue);
    const goalValue = GOAL[updateUserState.goal as unknown as keyof typeof GOAL] || GOAL.LOSE_WEIGHT
    const [selectedGoal, setSelectedGoal] = useState<GOAL>(goalValue);
    const fitnessLevelValue = FITNESS_LEVEL[updateUserState.fitnessLevel as unknown as keyof typeof FITNESS_LEVEL] || FITNESS_LEVEL.BEGINNER
    const [selectedFitnessLevel, setSelectedFitnessLevel] = useState<FITNESS_LEVEL>(fitnessLevelValue);
    const [selectedMedicalProblem, setSelectedMedicalProblem] = useState<HAS_INJURY>(updateUserState.injury !== "" ? HAS_INJURY.YES : HAS_INJURY.NO);
    const [medicalDetail, setMedicalDetail] = useState<string>(updateUserState.injury || '');
    const [enableEdit, setEnableEdit] = useState(false);
    const [isVisibleSuccess, setIsVisibleSuccess] = useState<boolean>(false);
    const [isVisibleErrors, setIsVisibleErrors] = useState<boolean>(false);
    const [focused, setFocused] = useState(false);
    const userTypeValue = USER_TYPE[updateUserState.userType as unknown as keyof typeof USER_TYPE] || USER_TYPE.STUDENT
    const [selectedUserType, setSelectedUserType] = useState<USER_TYPE>(userTypeValue);
    const [profileImage, setprofileImage] = useState(updateUserState?.avatarUrl || '');

    // const [hasEdited, setHasEdited] = useState(false);
    const updateUserMutation = useMutation({
        mutationFn: async () => {
            const gender = getEnumKeyByValue(GENDER, selectedGenre) as GENDER
            const goal = getEnumKeyByValue(GOAL, selectedGoal) as GOAL
            const fitnessLevel = getEnumKeyByValue(FITNESS_LEVEL, selectedFitnessLevel) as FITNESS_LEVEL
            const userType = getEnumKeyByValue(USER_TYPE, selectedUserType) as USER_TYPE
            const updateUserObj: Partial<User> = {
                name: updateUserState.name,
                age: updateUserState.age,
                weight: parseFloat(tmbWeight),
                height: parseFloat(tmbHeight),
                fitnessLevel,
                goal,
                gender,
                userType,
                injury: medicalDetail,
                avatarUrl: profileImage,
            };

            await updateUser(
                accessToken!,
                loggedUserInfo?.id!,
                updateUserObj
            )
        },
        onSuccess: async () => {
            setIsVisibleSuccess(true)
            await updateUserInfo()
        },
        onError: (error: any) => {
            console.log(error)
        }
    })

    useEffect(() => {
        if (selectedMedicalProblem === null) return;

        switch (selectedMedicalProblem) {
            case HAS_INJURY.NO:
                setEnableEdit(false);
                setMedicalDetail('');
                break;
            case HAS_INJURY.YES:
                setEnableEdit(true);
                break;
            default:
                break;
        }
    }, [selectedMedicalProblem]);

    const updateTmpUserState = (updatedFields: Partial<User> | null) => {
        setUpdateUserState((prevUser) => prevUser ? { ...prevUser, ...updatedFields } : {} as User);
    };

    const handleUpdateUser = () => {
        let isValidWeight = validateFloatInput(tmbWeight)
        let isValidHeight = validateFloatInput(tmbHeight)
        if (!isValidWeight || !isValidHeight) {
            setErrors(["Por favor, ingresa valores numéricos válidos. Por ejemplo: 59 [kg], 173.4 [cm]. Poligym considera el punto como separador decimal."])
            setIsVisibleErrors(true)
            return
        }
        const { errors: numericErrors } = validateNumericInput(parseFloat(tmbWeight), parseFloat(tmbHeight))
        if (numericErrors.length > 0) {
            setErrors(numericErrors)
            setIsVisibleErrors(true)
            return
        }

        const { errors: userInfoErrors } = validateUserInfo(updateUserState)
        setErrors(userInfoErrors)
        if (userInfoErrors.length > 0) {
            setIsVisibleErrors(true)
            return
        }
        updateUserMutation.mutate()
    }

    if (isLoading) return <WorkoutLoadingScreen />

    return (
        <Animated.View
            style={animatedStyle}
            className="flex-1 ">
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                className={`flex flex-col 
                    px-4
                    h-full ${isDark ? "bg-darkGray-500" : "bg-white"}`}
            >
                <View className='mt-2 rounded-lg '>

                    <View className={`mt-2 rounded-lg`}>
                        <Text className={`text-4xl font-ralewayBold text-start ${isDark ? "text-white" : "text-darkGray-500"} `}>Actualizar Información</Text>
                        <Text className={`text-sm font-raleway text-start ${isDark ? "text-white" : "text-darkGray-500"}`}>Actualiza tu información para obtener los mejores resultados de nuestras recomendaciones personalizadas</Text>

                        <View className='w-full items-center mt-2'>
                            <ImagePicker
                                imgUrl={profileImage}
                                setImg={setprofileImage}
                            />
                        </View>

                        <Text className={`text-sm font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} mb-2`}>
                            Nombre
                        </Text>
                        <IconTextInputForm
                            inputKeyboardType='email-address'
                            inputPlaceholder='Jhon Doe'
                            inputSecure={false}
                            inputValue={updateUserState.name}
                            inputOnChangeText={(text) => updateTmpUserState({ name: text })}
                            enabled={!updateUserMutation.isPending}
                        />

                        <Text className={`text-sm font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} mb-2`}>
                            Edad
                        </Text>
                        <IconTextInputForm
                            inputKeyboardType='number-pad'
                            inputPlaceholder='18'
                            inputSecure={false}
                            inputValue={updateUserState.age?.toString()}
                            inputOnChangeText={(text) => {
                                let isNumber = validateZInput(text)
                                updateTmpUserState({ age: isNumber ? parseInt(text) : undefined })
                            }}
                            enabled={!updateUserMutation.isPending}
                        />

                        <Text className={`text-sm font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} mb-2`}>
                            Peso (kg)
                        </Text>
                        <IconTextInputForm
                            inputKeyboardType='decimal-pad'
                            inputPlaceholder='60'
                            inputSecure={false}
                            inputValue={tmbWeight}
                            inputOnChangeText={setTmbWeight}
                            enabled={!updateUserMutation.isPending}
                        />

                        <Text className={`text-sm font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} mb-2`}>
                            Altura (cm)
                        </Text>
                        <IconTextInputForm
                            inputKeyboardType='decimal-pad'
                            inputPlaceholder='170'
                            inputSecure={false}
                            inputValue={tmbHeight}
                            inputOnChangeText={setTmbHeight}
                            enabled={!updateUserMutation.isPending}
                        />

                        <View className='py-2'>
                            <Text className={`text-sm font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} mb-2`}>
                                Género
                            </Text>
                            <RadioButtonIconComponent
                                options={Object.values(GENDER)}
                                icons={[
                                    <Ionicons name="male"
                                        size={35}
                                        color={isDark ? "#fff" : "#1c1c1c"} />,
                                    <Ionicons name="female"
                                        size={35}
                                        color={isDark ? "#fff" : "#1c1c1c"} />,
                                    <Ionicons name="male-female"
                                        size={35}
                                        color={isDark ? "#fff" : "#1c1c1c"} />,
                                ]}
                                selectedValue={selectedGenre}
                                setSelectedValue={setSelectedGenre}
                                rbComponentStyle='w-full flex flex-row'
                                rbIndividualRadioButtonStyle='flex flex-col items-center justify-center w-1/3'
                                rbIndividualTextBtnStyle='text-xs pb-2 font-ralewayExtraBold'
                            />
                        </View>

                        <View className='flex flex-col'>
                            <Text className={`text-sm font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} mb-2`}>
                                Objetivo
                            </Text>
                            <RadioButtonIconComponent
                                options={Object.values(GOAL)}
                                icons={[
                                    <Ionicons name="nutrition-outline"
                                        size={35}
                                        color={isDark ? "#fff" : "#1c1c1c"} />,
                                    <Ionicons name="barbell-outline"
                                        size={35}
                                        color={isDark ? "#fff" : "#1c1c1c"} />,
                                    <Ionicons name="fitness-sharp"
                                        size={35}
                                        color={isDark ? "#fff" : "#1c1c1c"} />,
                                    <Ionicons name="trophy-outline"
                                        size={35}
                                        color={isDark ? "#fff" : "#1c1c1c"} />,
                                ]}
                                selectedValue={selectedGoal}
                                setSelectedValue={setSelectedGoal}
                                rbComponentStyle='w-full grid grid-cols-3'
                                rbIndividualRadioButtonStyle='items-center justify-center'
                                rbIndividualTextBtnStyle='text-xs font-ralewayExtraBold'
                            />
                        </View>

                        <View className="flex flex-col">
                            <Text className={`text-sm font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} mb-2`}>
                                Experiencia
                            </Text>
                            <RadioButtonIconComponent
                                options={Object.values(FITNESS_LEVEL)}
                                icons={[
                                    <Ionicons name="star-outline" size={35} color={isDark ? "#fff" : "#1c1c1c"} />,
                                    <Ionicons name="star-half-outline" size={35} color={isDark ? "#fff" : "#1c1c1c"} />,
                                    <Ionicons name="star" size={35} color={isDark ? "#fff" : "#1c1c1c"} />,
                                ]}
                                selectedValue={selectedFitnessLevel}
                                setSelectedValue={setSelectedFitnessLevel}
                                rbComponentStyle='w-full flex flex-row'
                                rbIndividualRadioButtonStyle='flex flex-col items-center justify-center w-1/3'
                                rbIndividualTextBtnStyle='text-xs pb-2 font-ralewayExtraBold'
                            />
                        </View>

                        <View className="mt-2">
                            <Text className={`text-sm font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} mb-2`}>
                                Lesión
                            </Text>
                            <View>
                                <RadioButtonIconComponent
                                    options={Object.values(HAS_INJURY)}
                                    icons={[
                                        <Ionicons name="body-outline" size={35} color={isDark ? "#fff" : "#1c1c1c"} />,
                                        <Ionicons name="bandage-outline" size={35} color={isDark ? "#fff" : "#1c1c1c"} />,
                                    ]}
                                    rbComponentStyle='w-full flex flex-row'
                                    rbIndividualRadioButtonStyle='flex flex-col items-center justify-center w-1/2'
                                    rbIndividualTextBtnStyle='text-xs pb-2 font-ralewayExtraBold'
                                    selectedValue={selectedMedicalProblem}
                                    setSelectedValue={setSelectedMedicalProblem}
                                />
                            </View>
                        </View>


                        <>
                            <Text className={`text-sm mb-2  font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} `}>Detalle de lesión</Text>
                            <TextInput
                                className={`flex-row items-center p-1 mb-2
                                    font-raleway border-2 border-transparent
                                    ${isDark ? "bg-darkGray-900" : "bg-darkGray-100"}
                                    ${!enableEdit ? "opacity-40" : ""}
                                `}
                                placeholder={enableEdit ? "Tengo una fractura en..." : "No tengo ninguna lesión"}
                                placeholderTextColor="#a6a6a6"
                                keyboardType='ascii-capable'
                                maxLength={200}
                                multiline
                                numberOfLines={5}
                                value={medicalDetail}
                                onChangeText={setMedicalDetail}
                                editable={enableEdit}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                            />
                        </>

                        <View className="flex flex-col">
                            <Text className={`text-sm font-ralewayBold ${isDark ? "text-white" : "text-darkGray-500"} mb-2`}>
                                Cargo
                            </Text>
                            <RadioButtonIconComponent
                                options={Object.values(USER_TYPE)}
                                icons={[
                                    <Ionicons name="person-outline"
                                        size={35}
                                        color={isDark ? "#fff" : "#1c1c1c"} />,
                                    <Ionicons name="school-outline"
                                        size={35}
                                        color={isDark ? "#fff" : "#1c1c1c"} />,
                                    <Ionicons name="briefcase-outline"
                                        size={35}
                                        color={isDark ? "#fff" : "#1c1c1c"} />,
                                ]}
                                selectedValue={selectedUserType}
                                setSelectedValue={setSelectedUserType}
                                rbComponentStyle='w-full flex flex-row'
                                rbIndividualRadioButtonStyle='flex flex-col items-center justify-center w-1/3'
                                rbIndividualTextBtnStyle='text-xs pb-2 font-ralewayExtraBold'
                            />
                        </View>

                    </View>
                </View>

            </ScrollView>


            <View className='w-full'>
                <CTAButtonPrimary
                    onPress={handleUpdateUser}
                    text="Actualizar"
                    disabled={updateUserMutation.isPending}
                    isLoading={updateUserMutation.isPending}
                />

            </View>

            <CustomSnackbar
                visible={isVisibleErrors}
                message={errors.join('\n')}
                setVisible={setIsVisibleErrors}
                color='red'
                />

            <CustomSnackbar
                visible={isVisibleSuccess}
                message={'Tu información ha sido actualizada exitosamente'}
                setVisible={setIsVisibleSuccess}
                color='green'
            />
        </Animated.View>

    );
};

export default EditProfile;
