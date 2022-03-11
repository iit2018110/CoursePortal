export interface IBasket {
    id: string,
    name: string,
    courses: {
        id: string,
        name: string
    }[]
}