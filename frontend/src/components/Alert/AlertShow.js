import { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import { useAppContext } from '../../context/appContext';

function AlertShow() {
   const { showAlert, setShowAlert, alertText } = useAppContext()

   useEffect(() => {
      const timer = setTimeout(() => {
         setShowAlert(false)
      }, 1000);

      return () => clearTimeout(timer);
   }, [showAlert]);

   return (
      <Alert
         style={{
            position: 'absolute',
            bottom: showAlert ? '30px' : '-100%',
            transition: '0.5s',
            left: '50%',
            transform: "translateX(-50%)",
            zIndex: 10000,
            boxShadow: '0px 0px 17px 11px #EBEBEB'
         }}
      >
         {alertText}
      </Alert>

      );
   }

   export default AlertShow;