import React, {Fragment} from 'react';

const Login = ({setAuth}) => {
    return (
        <Fragment>
            <h1>Login</h1>
            {/* When the button is clicked, it calls setAuth with the value true. */}
            <button onClick={() => setAuth(true)}>Login</button>
        </Fragment>
    );
}

export default Login;