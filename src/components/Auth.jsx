
import React, { useState } from 'react'

import Login from './Login';
import Register from './Register';

function Auth(props) {

  const [show_register, setShowRegister] = useState(false);

  

  return (
    <div className="flex flex-col p-2 w-[30rem] items-center justify-center">
      {
        !show_register ?
          <Login show_register={show_register} setShowRegister={setShowRegister} show_auth={props.show_auth} setShowAuth={props.setShowAuth} />
          :
          <Register show_register={show_register} setShowRegister={setShowRegister} show_auth={props.show_auth} setShowAuth={props.setShowAuth} />
      }
    </div>
  )

}

export default Auth

