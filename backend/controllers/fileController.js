import File from '../models/files.js'


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


export {
   createFile
}