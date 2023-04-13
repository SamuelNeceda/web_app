import React, {Fragment} from 'react';

const Dashboard = ({setAuth}) => {
    return (
        <Fragment>
            <h1>Dashboard</h1>
            {/* When the button is clicked, it calls setAuth with the value false. */}
            <button onClick={() => setAuth(false)}>Logout</button>
        </Fragment>
    );
}

export default Dashboard;