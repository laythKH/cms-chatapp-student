import { useContext, createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from 'history';

const AppContext = createContext()

const AppProvider = ({ children }) => {
   const [user, setUser] = useState()

   console.log(user || 'user');

   const defaultValue = {
      _id: "648f36d1a19039c85a133b8b",
      email: "salim@gmail.com",
      name: "salim Alkhouy",
      picture: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      role: "admin",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGYzNmQxYTE5MDM5Yzg1YTEzM2I4YiIsImlhdCI6MTY4NzQ0MjcxMCwiZXhwIjoxNjg3NTI5MTEwfQ.k7C8mVb2Wq3kfp9TfcPc8u7RQjhrD_Sc4URm_74agZ4"
   }






   const history = createBrowserHistory();

   useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))

      if (!userInfo) {
         // history.push('/')
         setUser(defaultValue)
      }

      // console.log('Hello From App Provider');

      setUser(userInfo)

   }, [])

   return (
      <AppContext.Provider value={{ user, setUser }}>
         {children}
      </AppContext.Provider>
   )
}


const useAppContext = () => {
   return useContext(AppContext)
}


export { AppProvider, useAppContext }