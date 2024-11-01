import { PlanRoutineLevel } from "@/types/interfaces/entities/plan"

export const difficultyMapper = (level: PlanRoutineLevel) : string => {
    switch (level) {
        case "Baja": return "Principiante"
        case "Media": return "Intermedio"
        case "Alta": return "Avanzado"
        default: return "N/A"
    }
}