import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import Footer from "./Footer";
import TopList from "./TopList";

const Register = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        title: "",
        sex: "",
        birthnumber: "",
        birthdate: "",
        phone: "",
        email: "",
        password: "",
    });

    // Destructure
    const {
        firstname,
        lastname,
        title,
        sex,
        birthnumber,
        birthdate,
        phone,
        email,
        password,
    } = inputs;

    const onChange = (event) =>
        setInputs({...inputs, [event.target.name]: event.target.value});

    const onSubmitForm = async (event) => {
        event.preventDefault(); // Prevents the default behavior of the browser(reload)
        try {
            const body = {
                firstname,
                lastname,
                title,
                sex,
                birthnumber,
                birthdate,
                phone,
                email,
                password,
            };
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const parseJSON = await response.json();

            if (parseJSON.token) {
                localStorage.setItem("token", parseJSON.token); // Save the token in the local storage
                setAuth(true);
                toast.success("Registered successfully");
            } else {
                toast.error(parseJSON);
                setAuth(false);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const history = useHistory();

    const handleLoginClick = () => {
        history.push('/login');
    };

    return (
        <>
            <TopList/>
            <h1 className="text-center mp-5">Register</h1>
            <div className="square-container-register">
                <form onSubmit={onSubmitForm}>
                    <label htmlFor="firstname" className="mt-3 required-label">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        value={firstname}
                        onChange={(event) => onChange(event)}
                        placeholder="firstname"
                        className="form-control mp-3"
                    />
                    <label htmlFor="lastname" className="mt-3 required-label">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        value={lastname}
                        onChange={(event) => onChange(event)}
                        placeholder="lastname"
                        className="form-control mp-3"
                    />
                    <label htmlFor="title" className="mt-3">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(event) => onChange(event)}
                        placeholder="title"
                        className="form-control mp-3"
                    />
                    <label htmlFor="sex" className="mt-3 required-label">Sex</label>
                    <select
                        name="sex"
                        value={sex}
                        onChange={(event) => onChange(event)}
                        className="form-select"
                        aria-label="Default select example"
                        style={{height: "30px"}}
                    >
                        <option value="" disabled selected>
                            Sex
                        </option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                    <label htmlFor="birthnumber" className="mt-3 required-label">Birth number</label>
                    <input
                        type="text"
                        name="birthnumber"
                        value={birthnumber}
                        onChange={(event) => onChange(event)}
                        placeholder="YYMMDD/NNNN"
                        className="form-control mp-3"
                        maxLength={11}
                    />
                    <label htmlFor="birthdate" className="mt-3 required-label">Birth date</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={birthdate}
                        onChange={(event) => onChange(event)}
                        placeholder="birthdate"
                        className="form-control mp-3"
                    />
                    <label htmlFor="phone" className="mt-3 required-label">Phone number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={(event) => onChange(event)}
                        placeholder="phone"
                        className="form-control mp-3"
                        maxLength={24}
                    />
                    <label htmlFor="email" className="mt-3 required-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => onChange(event)}
                        placeholder="email"
                        className="form-control mp-3"
                    />
                    <label htmlFor="password" className="mt-3 required-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => onChange(event)}
                        placeholder="password"
                        className="form-control mp-3"
                    />
                    <button className="my-4 btn btn-success btn-block">Register</button>
                    <p className="required-field-text required-label">Required field</p>
                </form>
            </div>
            <div className="my-4 mx-auto text-center">
                <p className="text-center my-3">Already have an account?</p>
                <button className="btn btn-primary" onClick={handleLoginClick}>Login</button>
            </div>
            <Footer/>
        </>
    );
};
export default Register;
