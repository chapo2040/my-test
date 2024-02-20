import { BarLoader } from 'react-spinners';

export function Cargando({ isOpen, message }) 
{

  return(
    <div> 
      
      <dialog open={isOpen}>
        
        <div className='loading'>

            <div> 
                <BarLoader className='spinner' color="#e97401" height={5} width={150} loading /> 
            </div>
            
            <div>
                <span className='statusMessage'> {message} </span> 
            </div>

        </div>

      </dialog>

    </div>
  );
}