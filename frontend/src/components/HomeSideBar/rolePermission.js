export const roles = {
   manager: {
      course: true,
      createCourse: true,
      searchForCourse: true,
      assignment: false,
      createAssignment: false,
      submitAssignment: false
   },
   teacher: {
      course: false,
      createCourse: false,
      searchForCourse: false,
      assignment: true,
      createAssignment: true,
      submitAssignment: false
   },
   student: {
      course: false,
      createCourse: false,
      searchForCourse: false,
      assignment: true,
      createAssignment: false,
      submitAssignment: true
   },
};