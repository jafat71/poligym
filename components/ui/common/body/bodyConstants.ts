
export const BodyColors = {
    defaultColor: "#0055f9",
    selectedColor: "#E11F1C",
    workedColor01: "#CCE0FF",
    workedColor02: "#99C2FF",
    workedColor03: "#66A3FF",
    workedColor04: "#3385FF",
    workedColor05: "#0059FF",
    workedColor06: "#004ECC",
    workedColor07: "#004299",
    workedColor08: "#003666",
    workedColor09: "#002933",
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