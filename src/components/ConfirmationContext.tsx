import React, { createContext, useContext, useRef, useState } from 'react';
import ConfirmationDialog from './Dialogs.tsx';
 
interface ConfirmDialogProps 
{  
  message: string; 
}
 
const ConfirmDialog = createContext<(data: ConfirmDialogProps) => Promise<boolean>>(() => 
{  throw new Error('ConfirmDialogProvider not found'); });

export function ConfirmDialogProvider({ children, }: {  children: React.ReactNode; }) 
{ 
  const [state, setState] = useState({ visible: false });
  const [message, setMessage] = useState<string | undefined>();
  const fn = useRef<(choice: boolean) => void>(() => false);

    const confirm = (data: ConfirmDialogProps): Promise<boolean> => 
    {
        return new Promise((resolve, reject) => 
        {
            if (state.visible) 
            {
                reject(new Error('Confirm already called'));
            }
            
            setState({ ...data, visible: true });
            setMessage(data.message);

            fn.current = (choice: boolean) => 
            {
                resolve(choice);
                setState({ visible: false });
            };
        });
    };
 
    return (
        <ConfirmDialog.Provider value={confirm}>
        {children}
            <ConfirmationDialog
            isOpen={state.visible}
            message={message}
            handlerYes={ ()=>{ fn.current(true) }}
            handlerNo={ ()=>{ fn.current(false) } }                      
            />

        </ConfirmDialog.Provider>
    );
}
 
export const useConfirm = () => useContext(ConfirmDialog);