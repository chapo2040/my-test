import React from 'react';

function cmpLogin() 
{

    return (

        <React.Fragment>

            <label> Login </label>
            <form>
                <input type='text' placeholder="user" /> <br/>
                <input type='text' placeholder="password" /> <br/>
                <button> Login </button>
            </form> 

        </React.Fragment>
    )

}

export default cmpLogin;