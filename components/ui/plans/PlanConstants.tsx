import { RoutinePlan } from "@/types/interfaces/entities/plan";
import { MuscleGroups } from "@/types/types/muscles";

export type Dificultad =  'Baja' | 'Media' | 'Alta';
export const levelColors: Record<Dificultad, string> = {
    Baja: 'bg-lightGreen',
    Media: 'bg-[#F0F71A]',
    Alta: 'bg-[#F53B1F]',
}

export const getBannerImages = (routine: RoutinePlan): string => {
    switch (routine.musculos[0]) {
        case MuscleGroups.abdominals:
            return "https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        case MuscleGroups.biceps:
            return "https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=600"
        case MuscleGroups.calves:
            return "https://images.pexels.com/photos/13965339/pexels-photo-13965339.jpeg?auto=compress&cs=tinysrgb&w=600"
        case MuscleGroups.chest:
            return "https://images.pexels.com/photos/896058/pexels-photo-896058.jpeg?auto=compress&cs=tinysrgb&w=600"
        case MuscleGroups.forearms:
            return "https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg?auto=compress&cs=tinysrgb&w=600"
        case MuscleGroups.glutes:
            return "https://images.pexels.com/photos/371050/pexels-photo-371050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        case MuscleGroups.hamstrings:
            return "https://images.pexels.com/photos/14036851/pexels-photo-14036851.jpeg?auto=compress&cs=tinysrgb&w=600"
        case MuscleGroups.lats:
            return "https://images.pexels.com/photos/29084397/pexels-photo-29084397/free-photo-of-vista-posterior-de-un-hombre-haciendo-dominadas-en-un-gimnasio.jpeg?auto=compress&cs=tinysrgb&w=600"
        case MuscleGroups.lowerback:
            return "https://images.pexels.com/photos/28061/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
        case MuscleGroups.obliques:
            return "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=600"
        case MuscleGroups.quads:
            return "https://images.pexels.com/photos/9361352/pexels-photo-9361352.jpeg?auto=compress&cs=tinysrgb&w=600"
        case MuscleGroups.shoulders:
            return "https://images.pexels.com/photos/1865131/pexels-photo-1865131.jpeg?auto=compress&cs=tinysrgb&w=600"
        case MuscleGroups.traps:
            return "https://images.pexels.com/photos/13965347/pexels-photo-13965347.jpeg?auto=compress&cs=tinysrgb&w=600"
        case MuscleGroups.trapsmiddle:
            return "https://images.pexels.com/photos/20379154/pexels-photo-20379154/free-photo-of-mujer-deporte-fuerza-atleta.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        case MuscleGroups.triceps:
            return "https://images.pexels.com/photos/5327505/pexels-photo-5327505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        default:
            return "https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    }

}
