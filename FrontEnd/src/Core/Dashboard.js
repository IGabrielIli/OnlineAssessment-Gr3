import React from 'react';
import Test from './Test'
import Home from './Home'

class Dashboard extends React.Component {
  render() {
    return (
        <div>
          <div>
              <div class="header">
                  <a href="../" class="logo">OnlineAss</a>
                  <div class="header-right" style={{marginRight: "2%"}}>
                      <input class="text" type="text" placeholder="Search user..." />
                      <a href="#">
                        <span class="fa-stack" style={{fontSize:"28px"}}>
                          <i class="fa fa-circle fa-stack-2x" style={{color:"black"}}></i>
                          <i class="fa fa-envelope fa-stack-1x" style={{color: "white"}}></i>
                        </span>
                      </a>
                      <a href="#">
                        <span class="fa-stack" style={{fontSize:"28px"}}>
                          <i class="fa fa-circle fa-stack-2x" style={{color:"black"}}></i>
                          <i class="fa fa-user fa-stack-1x" style={{color: "white"}}></i>
                        </span>
                      </a>
                  </div>
              </div>     
            </div>
            <div class="w3-sidebar w3-light-grey w3-bar-block" style={{width: "6%", borderRightStyle:"solid", borderRightWidth: "5", borderRightColor: "black"}}>
              <a href="#" class="sbb"><i class="fa fa-file"></i><label style={{fontSize: "18px" }}>Exam</label></a>
              <a href="#" class="w3-bar-item w3-button">Link 2</a>
              <a href="#" class="w3-bar-item w3-button">Link 3</a>
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