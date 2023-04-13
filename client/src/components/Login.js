import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import Footer from "./Footer";
import TopList from "./TopList";

const Login = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const {email, password} = inputs;

    const onChange = (event) =>
        setInputs({...inputs, [event.target.name]: event.target.value});

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const body = {email, password};
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const parseJSON = await response.json();

            if (parseJSON.token) {
                localStorage.setItem("token", parseJSON.token);
                setAuth(true);
                toast.success("Logged in Successfully");
            } else {
                if (parseJSON.success === false) {
                    toast.info(parseJSON.message);
                } else {
                    setAuth(false);
                    toast.error(parseJSON);
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const history = useHistory();

    const handleRegisterClick = () => {
        history.push("/register");
    };

    return (
        <div>
            <TopList/>
            <h1 className="text-center mp-5">Login</h1>
            <div className="square-container-login">
                <form onSubmit={onSubmitForm} name="login_form">
                    <input
                        type="text" // email
                        name="email"
                        value={email}
                        onChange={(event) => onChange(event)}
                        placeholder="email"
                        className="form-control my-3"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => onChange(event)}
                        placeholder="password"
                        className="form-control my-3"
                    />
                    <button className="btn btn-success btn-block" name="login" type="submit">
                        Login
                    </button>
                </form>
            </div>
            <div className="my-4 mx-auto text-center">
                <p className="text-center my-3">Don't have an account?</p>
                <button className="btn btn-primary" onClick={handleRegisterClick}>
                    Register
                </button>
            </div>
            <Footer/>
        </div>
    );
};

export default Login;
