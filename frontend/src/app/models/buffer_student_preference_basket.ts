export interface IBufferStudentPreferenceBasket {
    id: string,
    name: string,
    status: string,
    pref1_course_id?: string,
    pref1_course_name?: string,
    pref2_course_id?: string,
    pref2_course_name?: string,
    pref3_course_id?: string,
    pref3_course_name?: string,
    pref4_course_id?: string,
    pref4_course_name?: string,
    pref5_course_id?: string,
    pref5_course_name?: string,
    courses: {
        id: string,
        name: string,
        faculty: {
            id: string,
            name: string
        }
    }[]
}
