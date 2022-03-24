import React from 'react';

class Dashboard extends React.Component {
  render() {
    return (
        <div class="app">
          <div>
              <div class="header">
                  <a href="../" class="logo">OnlineAss</a>
                  <div class="header-right" style={{marginRight: "2%"}}>
                      <input class="text" type="text" placeholder="Search..." />
                      <a href="#" class="but">
                        <span class="fa-stack" style={{fontSize:"28px"}}>
                          <i class="fa fa-circle fa-stack-2x" style={{color:"black"}}></i>
                          <i class="fa fa-envelope fa-stack-1x" style={{color: "white"}}></i>
                        </span>
                      </a>
                      <a href="#" class="but">
                        <span class="fa-stack" style={{fontSize:"28px"}}>
                          <i class="fa fa-circle fa-stack-2x" style={{color:"black"}}></i>
                          <i class="fa fa-user fa-stack-1x" style={{color: "white"}}></i>
                        </span>
                      </a>
                  </div>
              </div>  
              <div class="w3-sidebar w3-light-grey w3-bar-block" style={{width: "100px", borderRightStyle:"solid", borderRightWidth: "5", borderRightColor: "black"}}>
                <a href="#exams" class="sbb" style={{paddingLeft: "24px"}}><i class="fa fa-file"></i><br/><label style={{fontSize: "18px" }}>Exams</label></a>
                <a href="#questions" class="sbb" style={{paddingLeft: "13px"}}><i class="fa fa-comment"></i><br/><label style={{fontSize: "18px" }}>Questions</label></a>
                <a href="#calendar" class="sbb" style={{paddingLeft: "16px"}}><i class="fa fa-calendar"></i><br/><label style={{fontSize: "18px" }}>Calendar</label></a>
              </div>
              <div style={{marginLeft: "105px"}}>
                test
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