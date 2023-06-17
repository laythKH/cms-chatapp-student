
const getAllCourses = async (req, res) => {
   res.send('getAllCourses')
}
const createCourse = async (req, res) => {
   res.send('create course')
}
const deleteCourse = async (req, res) => {
   res.send('deleteCourse')
}
const updateCourse = async (req, res) => {
   res.send('updateCourse')
}


export { getAllCourses, createCourse, updateCourse, deleteCourse }