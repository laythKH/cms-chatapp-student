import File from '../models/files.js'
import Course from '../models/Course.js';

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
            const files = await File.find({ course: course._id });

            return {
               courseName: course.name,
               files: files.map((file) => ({
                  name: file.name,
                  url: file.url
               }))
            };
         })
      );

      res.json(coursesWithFiles);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
   }
}



export {
   createFile,
   getAllFilesRelatedTOTeacher
}