import mongoose from 'mongoose';
import User from '../models/User.js'


async function createUsers() {

   await mongoose.connect('mongodb://127.0.0.1:27017/taskmanageapp');

   // Insert 100 users
   for (let i = 1; i <= 100; i++) {
      const name = `User ${i}`;
      const email = `user${i}@example.com`;
      const role = 'user';
      const studentNumber = 20102000 + i;

      await User.create({ name, email, studentNumber, role });
   }

   // Disconnect from the database
   await mongoose.disconnect();
}


createUsers()