import { BodyColors } from "@/components/ui/body/bodyConstants";
import { MuscleGroups } from "@/types/types/muscles";

export const getMuscleColors = (muscleGroups: MuscleGroups[]) => {
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