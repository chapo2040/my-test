import React, { createContext, useContext, useRef, useState } from 'react';
import ConfirmationDialog from './Dialogs';

const ConfirmDialog = createContext<(message: string) => Promise<boolean>>(() => 
{  throw new Error('ConfirmDialogProvider not found'); });

interface ConfirmDialogProps 
{  
    children?: React.ReactNode;
}

export function ConfirmDialogProvider(props: ConfirmDialogProps) 
{ 
  const { children } = props;
  const [state, setState] = useState({ visible: false });
  const [message, setMessage] = useState<string | undefined>();
  const fn = useRef<(choice: boolean) => void>(() => false);

    const confirm = (message: string): Promise<boolean> => 
    {
        return new Promise((resolve, reject) => 
        {
            if (state.visible) 
            {
                //alert('ya abierta !');
                //reject(new Error('Confirm already called'));
                return;
            }
            
            setState({ visible: true });
            setMessage(message);

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