import React from 'react';
import { Link } from 'react-router-dom'
import { DBType, fetchDynamicItem } from './Interact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faPencil, faEllipsis } from '@fortawesome/free-solid-svg-icons'


class Dashboard extends React.Component {

  drawAssessments() {
    var indents = [];
    for (var i = 0; i < 20; i++) {
      indents.push(this.drawAssessment());
    }
    return indents;
  }

  drawAssessment(id) {
    var link = "/exam?id=".concat(fetchDynamicItem(DBType.ASSESSMENT_ID));
    var charts_link = "/charts?id=".concat(fetchDynamicItem(DBType.ASSESSMENT_ID));
    var edit_link = "/edit?id=".concat(fetchDynamicItem(DBType.ASSESSMENT_ID));
    return (
        <div class="assesskid">
          <span class="assesskidname">
            <Link to={link}>{fetchDynamicItem(DBType.ASSESSMENT_NAME)}</Link>
            <span class="assesskidbut">
              
              <FontAwesomeIcon icon={faEllipsis} />
            </span>
            <span class="assesskidbut">
              <Link to={(edit_link)}>
                <FontAwesomeIcon icon={faPencil} />
              </Link>
            </span>
            <span class="assesskidbut">
              <Link to={(charts_link)}>
                <FontAwesomeIcon icon={faChartColumn} />
              </Link>
            </span>
            <br/>
            <span class="assesskiddate">Date created: {fetchDynamicItem(DBType.ASSESSMENT_DATE)}</span>
          </span>
          
          <br/>
          <br/>
        </div>
    );
  }

  render() {
    return (
        <div class="app">
          <div>
              <div class="header">
                  <a href="../" class="logo">{fetchDynamicItem(DBType.PROJECT_TITLE)}</a>
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
              <div class="w3-sidebar w3-light-grey w3-bar-block" style={{ width: "100px", borderRightStyle:"solid", borderRightWidth: "5", borderRightColor: "black", overflowY: "hidden", overflowX:"hidden"}}>
                <a href="#exams" class="sbb" style={{paddingLeft: "24px"}}><i class="fa fa-file"></i><br/><label style={{fontSize: "18px" }}>Exams</label></a>
                <a href="#questions" class="sbb" style={{paddingLeft: "13px"}}><i class="fa fa-comment"></i><br/><label style={{fontSize: "18px" }}>Questions</label></a>
                <a href="#calendar" class="sbb" style={{paddingLeft: "16px"}}><i class="fa fa-calendar"></i><br/><label style={{fontSize: "18px" }}>Calendar</label></a>
                
                <Link to="/help" class="sbb" style={{paddingLeft: "35px"}}><i class="fa fa-info"></i><br/><label style={{fontSize: "18px" }}>Help</label></Link>
                
              </div>
              <div style={{marginLeft: "105px"}}><br/>
                <h1 style={{marginLeft: "25px"}}>Hello {fetchDynamicItem(DBType.USER_USERNAME)}</h1><br/>
                <span style={{marginLeft:"45px"}}>Learn <Link to="/help">how to create your own assessments</Link> or <Link to="/create">create one now</Link></span><br/><br/>
                <hr class="solid"/>
                <h2 style={{marginLeft: "25px"}}>Recent assessments</h2>
                <div class="assess">
                  {this.drawAssessments()}
                </div>
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