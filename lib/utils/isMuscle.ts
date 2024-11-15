import { MuscleGroups } from "@/types/types/muscles";

// Verifica musculo en enuim
export function isValidMuscleGroup(muscle: string): muscle is keyof typeof MuscleGroups {
    return muscle in MuscleGroups;
}