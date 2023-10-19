import { useState } from 'react';

import SignUpForm from '../widgets/sign_up_form';
import LoginForm from '../widgets/login_form';

function Register() {
  const [isLogin, setisLogin] = useState(true);





  return (
    <div className="font-sans flex  justify-center items-center min-h-screen bg-gradient-to-b from-indigo-500 to-blue-500 overflow-hidden">


      <div className='w-1/3 h-1/2  relative z-10'>
        <img src="assets/blob.svg" alt="" className='absolute -z-10 -top-40  -left-44 blob_style ' />
        {isLogin ? (
          <LoginForm setIsLogin={setisLogin}></LoginForm>
        ) : (
          <SignUpForm setIsLogin={setisLogin} />
        )}
      </div>

    </div>
  );
}

export default Register;