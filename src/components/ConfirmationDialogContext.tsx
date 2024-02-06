import React, { useCallback, useContext, useRef, useState } from "react";
import ConfirmationDialog from './Dialogs.tsx';

const ConfirmationDialogContext = React.createContext((message: string, handler: () => void) => {});
                
interface ConfirmationDialogContextProps 
{
    children?: React.ReactNode;
}
  
export function ConfirmationDialogContextProvider(props: ConfirmationDialogContextProps) 
{
    const { children } = props;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<string | undefined>();
    const [handler, setHandler] = useState(() => () => {});
        
    const showDialog = useCallback((message: string, handler: () => void) => 
    {
      setMessage(message);
      setHandler(() => handler);
      setOpen(true);
    }, []);
  
    return (
      <>
        <ConfirmationDialogContext.Provider value={showDialog}>
          {children}
        </ConfirmationDialogContext.Provider>
        <ConfirmationDialog
          isOpen={open}
          message={message}
          handlerYes={ ()=>{ handler(); setOpen(false); }}
           handlerNo={ ()=>{ handler(); setOpen(false); } }                      
        />
      </>
    );
}
  
export const useConfirmationDialog = () => useContext(ConfirmationDialogContext);