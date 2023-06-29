import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../../loader";

const SignUpForm = () => {
    const [formValues, setFormValues] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        showPassword: false,
    });

    const { fname, lname, email, password, showPassword } = formValues;

    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleTogglePassword = () => {
        setFormValues((prevValues) => ({
            ...prevValues,
            showPassword: !prevValues.showPassword,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            const response = await axios.post("http://localhost:3000/register/signup", {
                ...formValues,
            });
            if (response.status === 201) {
                console.log(response.data);
                // Display success message using toast notification library or modal dialog component
                alert('Registering Done ...!')
                localStorage.setItem("Email", email);
                localStorage.setItem('Name', `${fname} ${lname}`);

                navigate("/");
            } else {
                throw new Error(`${response.data}`);
            }
        } catch (error) {
            const errorMessage = error.response ? error.response.data : error.message;

            alert(errorMessage)
            console.error(error);
            // Display error message using toast notification library or modal dialog component
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`${window.innerWidth < 780 ? "stagger" : ""}`}
        >
            <div className="mb-4">
                <label htmlFor="fname" className="block font-medium mb-2 ">
                    First Name
                </label>
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={fname}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg text-black border-2 transition-all duration-300 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="lname" className="block font-medium mb-2 ">
                    Last Name
                </label>
                <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={lname}
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg text-black border-2 transition-all duration-300 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-2 ">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg text-black border-2 transition-all duration-300 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <span className="flex justify-between items-center">
                    <label htmlFor="password" className="block font-medium mb-2">
                        Password
                    </label>
                    <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        className="text-white cursor-pointer"
                        onClick={handleTogglePassword}
                    ></FontAwesomeIcon>
                </span>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    required
                    onChange={handleChange}
                    className="w-full text-black px-4 py-2 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:border-blue-500"
                />
            </div>
            {/* conditional rendering of loader */}
            {submitting && (
                <div className="h-full w-full flex justify-center">
                    <Loader />
                </div>
            )}
            {!submitting && <button
                type="submit"
                className="w-full bg-dark-blue text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
                Submit
            </button>}
        </form>
    );
};

export default SignUpForm;