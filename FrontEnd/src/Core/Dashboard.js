import React from 'react';
import Test from './Test'
import Home from './Home'

class Dashboard extends React.Component {
  render() {
    return (
        <div>
            <div class="header">
                <a href="../" class="logo">OnlineAss</a>
                <div class="header-right">
                    <input class="text" type="text" placeholder="Search user..." />
                    <a class="active" href="#home">Home</a>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
                </div>
            </div>      
        </div>
    );
  }
  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
  
  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }
}

export default Dashboard;