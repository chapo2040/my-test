import React, { useCallback, useContext, useState } from "react";
import Alert from './Alert.tsx';

const AlertContext = React.createContext((message: string) => {});
                
interface AlertContextProps 
{
    children?: React.ReactNode;
}
  
export function AlertContextProvider(props: AlertContextProps) 
{
    const { children } = props;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");    
        
    const showAlert = useCallback((message: string) => 
    {
      setMessage(message);      
      setOpen(true);
    }, []);
  
    return (
      <>
        <AlertContext.Provider value={showAlert}>
          {children}
        </AlertContext.Provider>
        <Alert isOpen={open} message={message} handler={ ()=>{ setOpen(false); } } />
      </>
    );
}
  
export const useAlert = () => useContext(AlertContext);