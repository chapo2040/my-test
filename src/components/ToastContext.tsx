import React, { useCallback, useContext, useState } from "react";
import Toast from './Toast';

const ToastContext = React.createContext((message: string) => {});
                
interface ToastContextProps 
{
    children?: React.ReactNode;
}
  
export function ToastContextProvider(props: ToastContextProps) 
{
    const { children } = props;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<string | undefined>();   
        
    const showToast = useCallback((message: string) => 
    {
        setMessage(message);        
        setOpen(true);
        setTimeout(() => { setOpen(false); }, 2000);
    }, []);
  
    return (
      <>
        <ToastContext.Provider value={showToast}>
          {children}
        </ToastContext.Provider>
        <Toast isOpen={open} message={message} />
      </>
    );
}
  
export const useToast = () => useContext(ToastContext);