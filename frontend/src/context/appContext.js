import { useContext, createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from 'history';

const AppContext = createContext()

const AppProvider = ({ children }) => {
   const [user, setUser] = useState()

   const history = createBrowserHistory();

   useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))

      if (!userInfo) {
         history.push('/')
      }

      console.log('Hello From App Provider');

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