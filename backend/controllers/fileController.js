import File from '../models/files.js'
import Course from '../models/Course.js';
import User from '../models/User.js'

import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";


const createFile = async (req, res) => {
   const { name, url, courseId } = req.body;
   const newFile = new File({
      name,
      url,
      course: courseId
   });

   const savedFile = await newFile.save();

   if (!savedFile) {
      throw new BadRequestError('There is an error while creating the file')
   }
   res.status(201).json(savedFile);
}

const getAllFilesRelatedTOTeacher = async (req, res) => {
   try {
      const teacherId = req.params.teacherId;

      // Find courses for the specific teacher
      const courses = await Course.find({ teacher: teacherId });

      // Iterate over the courses and fetch the related files for each course
      const coursesWithFiles = await Promise.all(
         courses.map(async (course) => {
            console.log(`course ===> ${course._id}`);
            const files = await File.find({ course: course._id });
            console.log(`singleFile ===> ${files}`);
            return {
               courseName: course.name,
               courseId: course._id,
               files: files
            };
         })
      );

      console.log(coursesWithFiles);
      res.json(coursesWithFiles);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
   }
}


const getAllFilesRelatedTORelated = async (req, res) => {
   try {
      const { userId } = req.params;

      // Find the user by their ID and populate the 'courses' field
      const user = await User.findById(userId).populate('courses');

      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      // Retrieve the course IDs from the user's courses
      const courseIds = user.courses.map((course) => course._id);

      // Find the files associated with the course IDs
      const files = await File.find({ course: { $in: courseIds } });

      // Group the files by their course ID
      const filesByCourseId = files.reduce((acc, file) => {
         if (!acc[file.course]) {
            acc[file.course] = [];
         }
         acc[file.course].push(file);
         return acc;
      }, {});

      // Transform the data into the desired format
      const transformedData = user.courses.map((course) => {
         const courseId = course._id;
         const courseName = course.name;
         const courseFiles = filesByCourseId[courseId] || [];

         return {
            courseId,
            courseName,
            files: courseFiles.map((file) => ({
               name: file.name,
               url: file.url
            }))
         };
      });

      res.json(transformedData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
   }
}



export {
   createFile,
   getAllFilesRelatedTOTeacher,
   getAllFilesRelatedTORelated
}