export type Level = 'Principiante' | 'Intermedio' | 'Avanzado'
export const levelColors: Record<Level, string> = {
    Principiante: 'bg-lightGreen',
    Intermedio: 'bg-[#F0F71A]',
    Avanzado: 'bg-[#F53B1F]',
}

export interface Plan {
    title: string
    duration: string
    users: number
    rating: number
    description: string
    image: string
    level: Level
}
