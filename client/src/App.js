import './App.css';
import React, {Fragment, useState} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {

    // default value of state is false, meaning user is not authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // check if user is authenticated
    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    return (
        <Fragment>
            <Router>
                <div className="container">

                    {/* Define routes using the Switch and Route components from react-router-dom */}
                    <Switch>
                        {/* If the user is not authenticated, display the Login component */}
                        <Route
                            exact
                            path="/login"
                            render={(props) =>
                                !isAuthenticated ? (
                                    <Login {...props} setAuth={setAuth}/>
                                ) : (
                                    /* If the user is authenticated, redirect to the Dashboard component */
                                    <Redirect to="/dashboard"/>
                                )
                            }
                        />
                        {/* If the user is not authenticated, display the Register component */}
                        <Route
                            exact
                            path="/register"
                            render={(props) =>
                                !isAuthenticated ? (
                                    <Register {...props} setAuth={setAuth}/>
                                ) : (
                                    /* If the user is authenticated, redirect to the Login component */
                                    <Redirect to="/login"/>
                                )
                            }
                        />
                        {/* If the user is authenticated, display the Dashboard component */}
                        <Route
                            exact
                            path="/dashboard"
                            render={(props) =>
                                isAuthenticated ? (
                                    <Dashboard {...props} setAuth={setAuth}/>
                                ) : (
                                    /* If the user is not authenticated, redirect to the Login component */
                                    <Redirect to="/login"/>
                                )
                            }
                        />
                    </Switch>

                </div>
            </Router>
        </Fragment>
    );
}

export default App;
