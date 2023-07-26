import { useContext, createContext, useState, useEffect, useCallback } from "react";
import { io } from 'socket.io-client';


const SockectContext = createContext()


const SocketProvider = ({ children }) => {
   const [socket, setSocket] = useState(null);

   useEffect(() => {
      // Create the socket object and store it in state
      const newSocket = io('http://localhost:3000');
      setSocket(newSocket);

      // Cleanup function to close the socket connection when the component unmounts
      return () => newSocket.close();
   }, []);

   return (
      <SockectContext.Provider value={{ socket }}>
         {children}
      </SockectContext.Provider>
   )
}

const useSocketContext = () => {
   return useContext(SockectContext)
}


export { SocketProvider, useSocketContext }