import { BodyColors } from "@/components/ui/body/bodyConstants";
import { MuscleGroup } from "@/types/interfaces/entities/plan"



export const getMuscleColors = (muscleGroups: MuscleGroup[]) => {
    const {
        defaultColor,
        selectedColor,
        ...scaleColors
    } = BodyColors;

    const muscleColors = {
        abdominals: '',
        calves: '',
        quads: '',
        obliques: '',
        forearms: '',
        biceps: '',
        chest: '',
        shoulders: '',
        traps: '',
        lowerback: '',
        triceps: '',
        hamstrings: '',
        glutes: '',
        lats: '',
        trapsmiddle: ''
    }

    muscleGroups.forEach((muscle) => {
        muscleColors[muscle]=scaleColors.workedColor05
    })
    
    return muscleColors
}