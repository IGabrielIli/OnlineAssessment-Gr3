import React from 'react';
import { Link } from 'react-router-dom'

class Home extends React.Component {
    render() {
        return (
            <div class="div_home">
                <Link to="/t">
                    <button class="button">
                        dsadsad
                    </button>
                </Link>
                <Link to="/dashboard">
                    <button class="button">
                        Dashboard
                    </button>
                </Link>
            </div>
        );
    }
}

export default Home;
