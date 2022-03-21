import React from 'react';
import { Link } from 'react-router-dom'

class Home extends React.Component {
    render() {
        return (
            <div class="div_home">
                <Link to="/t">
                    <button class="button">
                        Test
                    </button>
                </Link>
            </div>
        );
    }
}

export default Home;