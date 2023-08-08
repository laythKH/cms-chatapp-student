import { useContext, createContext, useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from 'history';


const AppContext = createContext()


const AppProvider = ({ children }) => {
   const [user, setUser] = useState({})
   const [showAlert, setShowAlert] = useState(false)
   const [alertText, setAlertText] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [selectedChat, setSelectedChat] = useState()
   const [listChats, setListChats] = useState([])
   const [refetch, setRefetch] = useState(false)


   const handleRedirect = useCallback((path) => {
      if (window.location.pathname !== path) {
         window.location.href = path;
      }
   }, []);


   useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (!userInfo) {
         handleRedirect("/login")
      }
      setUser(userInfo)

   }, [handleRedirect, setUser])

   return (
      <AppContext.Provider
         value={{
            user,
            setUser,
            showAlert,
            setShowAlert,
            alertText,
            setAlertText,
            isLoading,
            setIsLoading,
            selectedChat,
            setSelectedChat,
            listChats,
            setListChats,
            refetch,
            setRefetch,
         }}
      >
         {children}
      </AppContext.Provider>
   )
}


const useAppContext = () => {
   return useContext(AppContext)
}


export { AppProvider, useAppContext }