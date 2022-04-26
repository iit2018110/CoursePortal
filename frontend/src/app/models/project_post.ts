export interface IProjectPost {
  title: string,
  faculty_id: string,
  student_posted_id: string,
  students: {
    student_id: string
  }[]
}
