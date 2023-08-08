import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors'

import { Server } from "socket.io";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';

// db and authenticateUser
import connectDB from './db/connect.js';


// routers
import userRoutes from './routes/userRoutes.js';
import noteRouter from './routes/noteRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import submissionTaskRoutes from './routes/submissionTaskRouter.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
// import authenticateUser from './trying.js';


// app.use(cors())


//=====================================================
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
//=====================================================


app.use(cors())

if (process.env.NODE_ENV !== 'production') {
   app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());


app.get('/', (req, res) => {
   res.send(`
         <div style="height:100vh; display:flex; justify-content: center; align-items: center;">
            <h1>Welcome to CMS API SYS</h1>
         </div>
         `)
})

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/note', noteRouter)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/chat', chatRoutes)
app.use('/api/v1/message', messageRoutes)
app.use('/api/v1/task', taskRoutes)
app.use('/api/v1/solution', submissionTaskRoutes)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000;

connectDB(process.env.MONGO_URL);

const server = app.listen(port, () => {
   console.log(`Server is listening on port ${port}...`);
})
// start();

// const MAX_USERS = 100;
// let numUsers = 0;

const io = new Server(server, {
   pingTimeout: 60000000,
   cors: {
      origin: "http://localhost:3000",
   },
});

io.on("connection", (socket) => {

   socket.on("setup", (userData) => {
      socket.join(userData);
      socket.emit("connected");
   });

   socket.on('join chat', (room) => {
      socket.join(room)
      // console.log(socket.join(room));
      console.log("User Joined Room:  " + room);
   })

   socket.on('typing', (room) => socket.in(room).emit('typing'))
   socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))

   socket.on('new message', (newMessageRecieved) => {
      console.log(newMessageRecieved);
      var chat = newMessageRecieved.chat;

      if (!chat.users) return console.log('chat.user not define');
      // console.log('===========================');
      // console.log(chat.users);
      // console.log('===========================');
      chat.users.forEach(user => {
         if (user._id === newMessageRecieved.sender._id) {
            return
         }
         // console.log(user);
         socket.in(user._id).emit('message received', newMessageRecieved)
      });
   });


   socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData)
   })
})

