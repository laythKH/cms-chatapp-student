import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";

import { Server } from "socket.io";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import userRoutes from './routes/userRoutes.js';
import noteRouter from './routes/noteRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import submissionTaskRoutes from './routes/submissionTaskRouter.js'
import fileRoutes from './routes/fileRoutes.js'

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
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

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ msg: "welcome" });
});

app.get('/', (req, res) => {
  res.json({ msg: 'welcome' })
})

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/note', noteRouter)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/chat', chatRoutes)
app.use('/api/v1/message', messageRoutes)
app.use('/api/v1/solution', submissionTaskRoutes)
app.use('/api/v1/file', fileRoutes)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000;

connectDB("mongodb://127.0.0.1:27017/taskmanageapp");

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
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
  console.log('Connected to socket.io');

  //===============================================================================
  // numUsers++;

  // io.emit('user-count', numUsers);

  // socket.on('login', async ({ collageNumber, password }) => {
  //    // Check if the user is already logged in
  //    if (socket.collageNumber) {
  //       socket.emit('login-error', { message: 'You are already logged in' });
  //       return;
  //    }
  //    console.log('inside the login socket');
  //    // Check if the maximum number of users has been reached
  //    if (numUsers >= MAX_USERS) {
  //       socket.emit('login-error', { message: 'Maximum number of users reached' });
  //       return;
  //    }

  //    // Authenticate the user
  //    const user = await authenticateUser(collageNumber, password);
  //    console.log(user);
  //    if (!user) {
  //       socket.emit('login-error', { message: 'Invalid credentials' });
  //       return;
  //    }

  //    // Set the collageNumber property on the socket object
  //    socket.collageNumber = collageNumber;

  //    // Emit a login-success event to the client
  //    socket.emit('login-success', { user });

  //    // Update the user count and broadcast it to all clients
  //    console.log(numUsers);
  //    numUsers++;

  //    io.emit('user-count', numUsers);
  // });

  // socket.on('logout', () => {
  //    // Your logout code goes here

  //    numUsers--;
  //    io.emit('user-count', numUsers);
  // });

  // socket.on('disconnect', () => {
  //    console.log('A user disconnected');
  //    numUsers--;
  //    io.emit('user-count', numUsers);
  // });
  //===============================================================================



  socket.on("setup", (userData) => {
    socket.join(userData);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log(socket.join(room));
    console.log("User Joined Room:  " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    console.log(newMessageRecieved);
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.user not define");
    // console.log('===========================');
    // console.log(chat.users);
    // console.log('===========================');
    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) {
        return;
      }
      // console.log(user);
      socket.in(user._id).emit("message received", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData);
  });
});
