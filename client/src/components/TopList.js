import {Link} from 'react-router-dom';

function TopList() {
    return (
        <div className="top-list">
            <ul>
                <li style={{listStyle: 'none', display: 'inline-block', marginRight: '10px', padding: 0, margin: 0}}>
                    <Link to="/">
                        <img src="/full_logo.png" alt="Home" width="200" height="40"
                             style={{position: 'absolute', top: 10, left: 10}}/>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default TopList;
