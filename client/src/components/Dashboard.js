import React, {useState, useEffect} from "react";
import {toast} from "react-toastify";
import Footer from "./Footer";

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState(""); // Defining state for user's name

    const getProfile = async () => { // Asynchronous function to fetch user profile data
        try {
            const res = await fetch("http://localhost:5000/dashboard/", { // Making a GET request to the private route
                method: "GET",
                headers: {token: localStorage.token} // Including authorization token in headers
            });

            const parseData = await res.json(); // Parsing the response data
            setName(parseData.firstname); // Setting user's first name in state
        } catch (err) {
            console.error(err.message);
        }
    };

    const logout = (e) => { // Function to handle logout button click event
        e.preventDefault(); // Preventing default form submission behavior
        try {
            localStorage.removeItem("token"); // Removing token from local storage
            setAuth(false); // Setting authentication state to false
            toast.success("Logout successfully");
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => { // Using useEffect hook to fetch user profile data when component mounts
        getProfile();
    }, []); // Passing an empty array as a dependency to run the effect only once

    return (
        <div style={{paddingTop: "40px"}}>
            <h1 className="mt-5 text-center">Personal Dashboard</h1>
            <h2 className="text-center">Welcome {name}</h2>
            <button onClick={e => logout(e)} className="btn btn-primary"
                    style={{position: "absolute", top: "30px", right: "30px"}}>
                Logout
            </button>
            <Footer/>
        </div>
    );
};

export default Dashboard; // Exporting Dashboard component
