import { Alert } from './Controles';
import { createContext, useContext, useState } from 'react';

const ConfirmDialog = createContext();

export function ConfirmDialogProvider({ children }) 
{
  const [state, setState] = useState({ isOpen: false });

  return (
    <ConfirmDialog.Provider value={setState}>
      {children}
      <Alert isOpen={state.isOpen} />
    </ConfirmDialog.Provider>
  );
}

export default function useConfirm() 
{    
  return useContext(ConfirmDialog);
}