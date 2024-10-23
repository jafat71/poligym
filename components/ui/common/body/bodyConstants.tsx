import MaleBack from '@/components/ui/common/body/MaleBack';
import MaleFront from './MaleFront';

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

export enum MuscleGroups {
    calves = "pantorrillas", 
    quads = "cuádriceps",
    obliques = "oblicuos",
    abdominals = "abdominales",
    forearms = "antebrazos",
    biceps = "bíceps",
    chest = "pecho",
    shoulders = "hombros",
    traps = "trapecios",
    lowerback = "zona lumbar",
    triceps = "tríceps",
    hamstrings = "isquiotibiales",
    glutes = "glúteos",
    lats = "dorsales",
    trapsmiddle = "trapecio medio"
}

export interface MuscleGroupsColors {
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
    muscleColors: MuscleGroupsColors;
    className?: string;
}

export const MuscleFocusColored = {
    calves: {
            calves: BodyColors.selectedColor,
            quads: BodyColors.defaultColor,
            obliques: BodyColors.defaultColor,
            abdominals: BodyColors.defaultColor,
            forearms: BodyColors.defaultColor,
            biceps: BodyColors.defaultColor,
            chest: BodyColors.defaultColor,
            shoulders: BodyColors.defaultColor,
            traps: BodyColors.defaultColor,
            lowerback: BodyColors.defaultColor,
            triceps: BodyColors.defaultColor,
            hamstrings: BodyColors.defaultColor,
            glutes: BodyColors.defaultColor,
            lats: BodyColors.defaultColor,
            trapsmiddle: BodyColors.defaultColor
    },
    quads: {
        calves: BodyColors.defaultColor,
        quads: BodyColors.selectedColor,
        obliques: BodyColors.defaultColor,
        abdominals: BodyColors.defaultColor,
        forearms: BodyColors.defaultColor,
        biceps: BodyColors.defaultColor,
        chest: BodyColors.defaultColor,
        shoulders: BodyColors.defaultColor,
        traps: BodyColors.defaultColor,
        lowerback: BodyColors.defaultColor,
        triceps: BodyColors.defaultColor,
        hamstrings: BodyColors.defaultColor,
        glutes: BodyColors.defaultColor,
        lats: BodyColors.defaultColor,
        trapsmiddle: BodyColors.defaultColor
    },
    obliques: {
        calves: BodyColors.defaultColor,
        quads: BodyColors.defaultColor,
        obliques: BodyColors.selectedColor,
        abdominals: BodyColors.defaultColor,
        forearms: BodyColors.defaultColor,  
        biceps: BodyColors.defaultColor,
        chest: BodyColors.defaultColor,
        shoulders: BodyColors.defaultColor,
        traps: BodyColors.defaultColor,
        lowerback: BodyColors.defaultColor,
        triceps: BodyColors.defaultColor,
        hamstrings: BodyColors.defaultColor,    
        glutes: BodyColors.defaultColor,
        lats: BodyColors.defaultColor,
        trapsmiddle: BodyColors.defaultColor
    },
    abdominals: {
        calves: BodyColors.defaultColor,
        quads: BodyColors.defaultColor,
        obliques: BodyColors.defaultColor,
        abdominals: BodyColors.selectedColor,
        forearms: BodyColors.defaultColor,
        biceps: BodyColors.defaultColor,   
        chest: BodyColors.defaultColor,
        shoulders: BodyColors.defaultColor,
        traps: BodyColors.defaultColor,
        lowerback: BodyColors.defaultColor,
        triceps: BodyColors.defaultColor,
        hamstrings: BodyColors.defaultColor,
        glutes: BodyColors.defaultColor,
        lats: BodyColors.defaultColor,
        trapsmiddle: BodyColors.defaultColor
    },
    forearms: {
        calves: BodyColors.defaultColor,
        quads: BodyColors.defaultColor,
        obliques: BodyColors.defaultColor,
        abdominals: BodyColors.defaultColor,
        forearms: BodyColors.selectedColor,
        biceps: BodyColors.defaultColor,
        chest: BodyColors.defaultColor,
        shoulders: BodyColors.defaultColor,
        traps: BodyColors.defaultColor,
        lowerback: BodyColors.defaultColor,
        triceps: BodyColors.defaultColor,
        hamstrings: BodyColors.defaultColor,
        glutes: BodyColors.defaultColor,
        lats: BodyColors.defaultColor,
        trapsmiddle: BodyColors.defaultColor
    },
    biceps: {
        calves: BodyColors.defaultColor,
        quads: BodyColors.defaultColor,
        obliques: BodyColors.defaultColor,
        abdominals: BodyColors.defaultColor,
        forearms: BodyColors.defaultColor,
        biceps: BodyColors.selectedColor,   
        chest: BodyColors.defaultColor,
        shoulders: BodyColors.defaultColor,
        traps: BodyColors.defaultColor,
        lowerback: BodyColors.defaultColor,
        triceps: BodyColors.defaultColor,
        hamstrings: BodyColors.defaultColor,
        glutes: BodyColors.defaultColor,
        lats: BodyColors.defaultColor,
        trapsmiddle: BodyColors.defaultColor
    },
    chest: {
        calves: BodyColors.defaultColor,
        quads: BodyColors.defaultColor,
        obliques: BodyColors.defaultColor,
        abdominals: BodyColors.defaultColor,
        forearms: BodyColors.defaultColor,
        biceps: BodyColors.defaultColor,
        chest: BodyColors.selectedColor,    
        shoulders: BodyColors.defaultColor,
        traps: BodyColors.defaultColor,
        lowerback: BodyColors.defaultColor,
        triceps: BodyColors.defaultColor,
        hamstrings: BodyColors.defaultColor,
        glutes: BodyColors.defaultColor,
        lats: BodyColors.defaultColor,
        trapsmiddle: BodyColors.defaultColor
    },
    shoulders: {
        calves: BodyColors.defaultColor,
        quads: BodyColors.defaultColor,
        obliques: BodyColors.defaultColor,
        abdominals: BodyColors.defaultColor,
        forearms: BodyColors.defaultColor,
        biceps: BodyColors.defaultColor,
        chest: BodyColors.defaultColor,
        shoulders: BodyColors.selectedColor,
        traps: BodyColors.defaultColor,
        lowerback: BodyColors.defaultColor,
        triceps: BodyColors.defaultColor,
        hamstrings: BodyColors.defaultColor,
        glutes: BodyColors.defaultColor,
        lats: BodyColors.defaultColor,
        trapsmiddle: BodyColors.defaultColor
    },
    traps: {
        calves: BodyColors.defaultColor,
        quads: BodyColors.defaultColor,
        obliques: BodyColors.defaultColor,
        abdominals: BodyColors.defaultColor,
        forearms: BodyColors.defaultColor,
        biceps: BodyColors.defaultColor,
        chest: BodyColors.defaultColor,
        shoulders: BodyColors.defaultColor,
        traps: BodyColors.selectedColor,
        lowerback: BodyColors.defaultColor,
        triceps: BodyColors.defaultColor,
        hamstrings: BodyColors.defaultColor,
        glutes: BodyColors.defaultColor,
        lats: BodyColors.defaultColor,
        trapsmiddle: BodyColors.defaultColor
    },
    lowerback: {
        calves: BodyColors.defaultColor,
        quads: BodyColors.defaultColor,
        obliques: BodyColors.defaultColor,
        abdominals: BodyColors.defaultColor,
        forearms: BodyColors.defaultColor,
        biceps: BodyColors.defaultColor,
        chest: BodyColors.defaultColor, 
        shoulders: BodyColors.defaultColor,
        traps: BodyColors.defaultColor,
        lowerback: BodyColors.selectedColor,
        triceps: BodyColors.defaultColor,
        hamstrings: BodyColors.defaultColor,
        glutes: BodyColors.defaultColor,
        lats: BodyColors.defaultColor,
        trapsmiddle: BodyColors.defaultColor    
    },
    triceps: {
        calves: BodyColors.defaultColor,
        quads: BodyColors.defaultColor,
        obliques: BodyColors.defaultColor,
        abdominals: BodyColors.defaultColor,
        forearms: BodyColors.defaultColor,
        biceps: BodyColors.defaultColor,
        chest: BodyColors.defaultColor, 
        shoulders: BodyColors.defaultColor,
        traps: BodyColors.defaultColor,
        lowerback: BodyColors.defaultColor,
        triceps: BodyColors.selectedColor,
        hamstrings: BodyColors.defaultColor,
        glutes: BodyColors.defaultColor,
        lats: BodyColors.defaultColor,
        trapsmiddle: BodyColors.defaultColor
    },
    hamstrings: {
        calves: BodyColors.defaultColor,
        quads: BodyColors.defaultColor,
        obliques: BodyColors.defaultColor,
        abdominals: BodyColors.defaultColor,
        forearms: BodyColors.defaultColor,
        biceps: BodyColors.defaultColor,    
        chest: BodyColors.defaultColor,
        shoulders: BodyColors.defaultColor,
        traps: BodyColors.defaultColor,
        lowerback: BodyColors.defaultColor,
        triceps: BodyColors.defaultColor,
        hamstrings: BodyColors.selectedColor,
        glutes: BodyColors.defaultColor,
        lats: BodyColors.defaultColor,
        trapsmiddle: BodyColors.defaultColor        
    },
    glutes: {
        calves: BodyColors.defaultColor,        
        quads: BodyColors.defaultColor,
        obliques: BodyColors.defaultColor,
        abdominals: BodyColors.defaultColor,
        forearms: BodyColors.defaultColor,
        biceps: BodyColors.defaultColor,
        chest: BodyColors.defaultColor,
        shoulders: BodyColors.defaultColor,
        traps: BodyColors.defaultColor,
        lowerback: BodyColors.defaultColor,
        triceps: BodyColors.defaultColor,
        hamstrings: BodyColors.defaultColor,
        glutes: BodyColors.selectedColor,
        lats: BodyColors.defaultColor,
        trapsmiddle: BodyColors.defaultColor

    },
    lats: {
        calves: BodyColors.defaultColor,
        quads: BodyColors.defaultColor,
        obliques: BodyColors.defaultColor,
        abdominals: BodyColors.defaultColor,
        forearms: BodyColors.defaultColor,
        biceps: BodyColors.defaultColor,
        chest: BodyColors.defaultColor,
        shoulders: BodyColors.defaultColor,
        traps: BodyColors.defaultColor,
        lowerback: BodyColors.defaultColor,
        triceps: BodyColors.defaultColor,
        hamstrings: BodyColors.defaultColor,
        glutes: BodyColors.defaultColor,
        lats: BodyColors.selectedColor,
        trapsmiddle: BodyColors.defaultColor
    },
    trapsmiddle: {
        calves: BodyColors.defaultColor,
        quads: BodyColors.defaultColor,
        obliques: BodyColors.defaultColor,
        abdominals: BodyColors.defaultColor,
        forearms: BodyColors.defaultColor,  
        biceps: BodyColors.defaultColor,
        chest: BodyColors.defaultColor,
        shoulders: BodyColors.defaultColor,
        traps: BodyColors.defaultColor,
        lowerback: BodyColors.defaultColor,
        triceps: BodyColors.defaultColor,
        hamstrings: BodyColors.defaultColor,
        glutes: BodyColors.defaultColor,
        lats: BodyColors.defaultColor,
        trapsmiddle: BodyColors.selectedColor
    }
}

export const getMuscleImage = (muscleName: MuscleGroups) => {
    switch (muscleName) {
        case MuscleGroups.calves:
            return (<MaleBack width={100} height={100} muscleColors={MuscleFocusColored.calves} />)
        case MuscleGroups.quads:
            return (<MaleFront width={100} height={100} muscleColors={MuscleFocusColored.quads} />)
        case MuscleGroups.obliques:
            return (<MaleFront width={100} height={100} muscleColors={MuscleFocusColored.obliques} />)
        case MuscleGroups.abdominals:
            return (<MaleFront width={100} height={100} muscleColors={MuscleFocusColored.abdominals} />)
        case MuscleGroups.forearms:
            return (<MaleBack width={100} height={100} muscleColors={MuscleFocusColored.forearms} />)
        case MuscleGroups.biceps:
            return (<MaleFront width={100} height={100} muscleColors={MuscleFocusColored.biceps} />)
        case MuscleGroups.chest:
            return (<MaleFront width={100} height={100} muscleColors={MuscleFocusColored.chest} />)
        case MuscleGroups.shoulders:
            return (<MaleBack width={100} height={100} muscleColors={MuscleFocusColored.shoulders} />)
        case MuscleGroups.traps:
            return (<MaleBack width={100} height={100} muscleColors={MuscleFocusColored.traps} />)
        case MuscleGroups.lowerback:
            return (<MaleBack width={100} height={100} muscleColors={MuscleFocusColored.lowerback} />)
        case MuscleGroups.triceps:
            return (<MaleBack width={100} height={100} muscleColors={MuscleFocusColored.triceps} />)
        case MuscleGroups.hamstrings:
            return (<MaleBack width={100} height={100} muscleColors={MuscleFocusColored.hamstrings} />)
        case MuscleGroups.glutes:
            return (<MaleBack width={100} height={100} muscleColors={MuscleFocusColored.glutes} />)
        case MuscleGroups.lats:
            return (<MaleBack width={100} height={100} muscleColors={MuscleFocusColored.lats} />)
        case MuscleGroups.trapsmiddle:
            return (<MaleBack width={100} height={100} muscleColors={MuscleFocusColored.trapsmiddle} />)
        default:
            return null; 
    }
}