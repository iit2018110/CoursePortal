export interface IAssigned_basket {
    id: string,
    name: string,
    courses: {
        id: string,
        name: string,
        seats: number,
        faculty: {
            id: string,
            name: string
        }
    }[]
}