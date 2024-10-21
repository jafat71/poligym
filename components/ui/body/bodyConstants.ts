
export const BodyColors = {
    defaultColor: "#0055f9", 
    selectedColor: "#E11F1C",
}

export interface MuscleGroups {
    calves: string;
    quads: string;
    obliques: string;
    abdominals: string;
    forearms: string;
    biceps: string;
    chest: string;
    shoulders: string;
    traps: string;
    lowerback: string;
    triceps: string;
    hamstrings: string;
    glutes: string;
    lats: string;
    trapsmiddle: string;
}

export interface BodyProps {
    width: number;
    height: number;
    muscleColors: MuscleGroups;
    className?: string;
}