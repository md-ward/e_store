
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogInForm from "../widgets/login_form";
import SignUpForm from "../widgets/signUp_form";
import Loader from "../../../loader";


const LogInPage = () => {

    const [signUpLoginTouggle, setsignUpLoginTouggle] = useState(false);

    const navigate = useNavigate();


    const handleSingUpandLoginTouggle = () => {
        handleSingUp()
        setTimeout(() => {
            setsignUpLoginTouggle(!signUpLoginTouggle)

        }, 200);
    }


    function handleSingUp() {
        if (window.innerWidth > 780) {
            const topLeft = document.getElementById('top-left');
            const bottomRight = document.getElementById('bottom-right');
            topLeft.classList.add('clipRectTopLeft');
            bottomRight.classList.add('clipRectBottomRight');

            bottomRight.addEventListener('animationend', () => {
                topLeft.classList.remove('clipRectTopLeft');
                bottomRight.classList.remove('clipRectBottomRight');
                topLeft.classList.add('clipRectTopLeftReverse');
                bottomRight.classList.add('clipRectBottomRightReverse');

                bottomRight.addEventListener('animationend', () => {
                    topLeft.classList.remove('clipRectTopLeftReverse');
                    bottomRight.classList.remove('clipRectBottomRightReverse');
                }, { once: true });
            }, { once: true });
        }


    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center text-white bg-gray-100 from-dark-blue-2 to-indigo-500 bg-gradient-to-br " >

            <div className={`  relative  p-8 rounded-lg shadow-lg drop-shadow-lg    duration-300 ease-in-out shadow-dark-blue   `}>





                {signUpLoginTouggle ? <SignUpForm

                /> : <LogInForm />}
                <div className="mt-6 text-center relative flex flex-col">
                    <p className="text-white">   {signUpLoginTouggle ? 'Already Signed up ?' : 'Don\'t have an account?'
                    }</p>
                    <span onClick={handleSingUpandLoginTouggle} className="cursor-pointer group text-blue-800 bg-white rounded-md p-3 mt-3 relative overflow-hidden h-14 hover:text-white hover:bg-indigo-400 text-lg ">

                        {signUpLoginTouggle ? 'Log in ' : ' Sign up'
                        }
                    </span>
                </div>

                <span className={` absolute   h-full top-0 left-0 rounded-lg z-10 bg-slate-600`} id="top-left"></span>

                <span className="  absolute  h-full top-0 left-0 rounded-lg z-20  bg-indigo-300   " id="bottom-right"></span>

            </div>


        </div>




    );
};

export default LogInPage;