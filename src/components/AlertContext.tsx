import React, { useCallback, useContext, useState } from "react";
import Alert from './Alert.tsx';

const AlertContext = React.createContext((message: string, handler: () => void) => {});
                
interface AlertContextProps 
{
    children?: React.ReactNode;
}
  
export function AlertContextProvider(props: AlertContextProps) 
{
    const { children } = props;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<string | undefined>();
    const [handler, setHandler] = useState(() => () => {});
        
    const showToast = useCallback((message: string, handler: () => void) => 
    {
      setMessage(message);
      setHandler(() => handler);
      setOpen(true);
    }, []);
  
    return (
      <>
        <AlertContext.Provider value={showToast}>
          {children}
        </AlertContext.Provider>
        <Alert isOpen={open} message={message} handler={ ()=>{ handler(); setOpen(false); } } />
      </>
    );
}
  
export const useAlert = () => useContext(AlertContext);