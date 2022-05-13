import React from 'react';
import { Link } from 'react-router-dom'
import { DBType, fetchDynamicItem } from './Interact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faPencil, faEllipsis } from '@fortawesome/free-solid-svg-icons'

let answersSize = 1;
let answersArray = [''];
let selectedArray = [0];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "main",
    };
  }

  onTabClick(id) {
    this.setState({tab: id});
  }

  drawTabs() {
    switch(this.state.tab) {
      case "main":
        return(
        <div>
            <h1 style={{marginLeft: "25px"}}>Hello {fetchDynamicItem(DBType.USER_USERNAME)}</h1><br/>
            <h2 style={{marginLeft:"45px"} }>Learn <Link to="#help" onClick={() => this.onTabClick("help")}>how to create your own Exam</Link> or <Link to="#create">create one now</Link></h2><br/><br/>
            <hr class="solid"/>
            <h3 style={{marginLeft: "25px"}}>Recent Assessmets</h3>
            <div class="assess">
              {this.drawAssessments()}
            </div>
        </div>
        );
      case "exams":
        return(
          <div>
            <div class="hello">
            <h2 style={{marginLeft: "60px"}}>Your Assessments </h2>
              <button class="createassess"style={{marginLeft:"1500px"}}>Create New</button>
            </div>
            <hr class="solid"/>
            <div class="assessExam">
              {this.drawAssessments()}
            </div>
          </div>
        );
      case "questions":
        return(
          <div>
                <Link to="#newquestion" onClick={() => this.onTabClick("newquestion")} class="sbb" style={{paddingLeft: "13px"}}><i class="fa fa-comment"></i><br/><label style={{fontSize: "18px" }}>Questions</label></Link>
          </div>
        );
      case "calendar":

      
        return (
        <div>
         
        </div>
        );
      
      case "newquestion":
        return(
        <div class="question_tab">
          {this.drawCurrentAnswers()}
          <br/><br/>
          <div>
            <button type="button" onClick={ () => this.handleAddAnswer() }>Add</button>
          </div>
        </div>
      );
      case "notifications" :
      return(
        <div>
            <div class="hello">
            <h2 style={{marginLeft: "60px"}}>Notifications </h2>
            </div>
            <hr class="solid"/>
            <div class="assessNotifications">
              
            </div>
        </div>
      );
      case "profile":
        return(
          <div>
              <div class="hello">
                <h2 style={{marginLeft: "60px"}}>Your Profile </h2>
              </div>
              <hr class="solidprofile"/>
              <div>
            <label class="profiledetailslabels">Username:</label>
            <label class="details1">Username</label>
          </div>
          <div>
            <label class="profiledetailslabels">Full Name:</label>
            <label class="details1">Username:*</label>
          </div>
          <div>
            <label class="profiledetailslabels">Email:</label>
            <label class="details1">Username:*</label>
          </div>
          <div>
            <label class="profiledetailslabels">Job Title:</label>
            <label class="details1">Username:*</label>
          </div>
          <button class="editprofilebutton"style={{marginLeft:"780px"}} onClick={() => this.onTabClick("editprofile")}>Edit</button>
          
          </div>
        );
      case "editprofile" :
      return(
        <div>
          <div class="hello">
            <h2 style={{marginLeft: "60px"}}>Edit Your Profile </h2>
          </div>
          <hr class="solid"/>
          <div>
            <label class="profiledetailslabels">Username:*</label>
            <input type="text" class="details"></input>
          </div>
          <div>
            <label class="profiledetailslabels">Full Name:*</label>
            <input type="text" class="details"></input>
          </div>
          <div>
            <label class="profiledetailslabels">Email:*</label>
            <input type="text" class="details" ></input>
          </div>
          <div>
            <label class="profiledetailslabels">Job Title:</label>
            <input type="text" class="details"></input>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div>
            <label class="profiledetailslabels">Old Password:*</label>
            <input type="text" class="details"></input>
          </div>
          <div>
            <label class="profiledetailslabels">New Password:*</label>
            <input type="text" class="details"></input>
          </div>
          <div>
            <label class="profiledetailslabels">Confirm Password:*</label>
            <input type="text" class="details" ></input>
          </div>
          <button class="editprofileconfirmbutton"style={{marginLeft:"800px"}} >Confirm</button>
        </div>
      );
        case "help":
          return(
            <div>
              <div class="hello">
                <h2 style={{marginLeft: "60px"}}>Help </h2>
              </div>
              <hr class="solid"/>
            </div>
          );
    }
  }

  drawAssessments() {
    var indents = [];
    for (var i = 0; i < 20; i++) {
      indents.push(this.drawAssessment());
    }
    return indents;
  }

  drawCurrentAnswers() {
    var indents = [];
    for (var i = 0; i < answersSize; i++) {
      indents.push(this.drawAnswer(i));
    }
    return indents;
  }

  drawAnswer(id) {
    return (
      <div>
        <label class="container">
          <input type="checkbox" onChange={ (e) => this.handleSelectedChange(e, id) } />
          <span class="checkmark" style={{marginRight:"28px"}} />
          <input type="text" class="answer" onChange={ (e) => this.handleAnswerChange(e, id) }/>
        </label>
        <br/><br/><br/>
      </div>
    )
  }

  handleAddAnswer() {
    answersSize++;
    answersArray.push('');
    selectedArray.push(false);
    this.setState(this.state);
  }

  handleSelectedChange(e, id) {
    selectedArray[id] = e.target.checked;
    // console.log(selectedArray[id]);
  }

  handleAnswerChange(e, id) {
    answersArray[id] = e.target.value;
    // console.log(answersArray[id]);
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
                <Link to="#main" onClick={() => this.onTabClick("main")} class="logo">{fetchDynamicItem(DBType.PROJECT_TITLE)}</Link>
                  <div class="header-right" style={{marginRight: "2%"}}>
                      <div class="search"><input type="text" placeholder="Search..." /></div>
                      <a href="#" class="but">
                      <Link to="#notifications" onClick={() => this.onTabClick("notifications")}>
                        <span class="fa-stack" style={{fontSize:"28px"}}>
                            <i class="fa fa-circle fa-stack-2x" style={{color:"white"}}></i>
                            <i class="fa fa-envelope fa-stack-1x" style={{color: "#04293A"}}></i>
                        </span>
                        </Link>
                      </a>
                      <a href="#" class="but">
                      <Link to="#profile" onClick={() => this.onTabClick("profile")}  >
                        <span class="fa-stack" style={{fontSize:"30px"}}>
                          <i class="fa fa-circle fa-stack-2x" style={{color:"white"}}> </i>
                          <i class="fa fa-user fa-stack-1x" style={{color: "#04293A"}}></i>
                        </span>
                      </Link>
                      </a>
                      <a href="#" class="but">
                      <Link to="#profile" onClick  >
                        <span class="fa-stack" style={{fontSize:"30px"}}>
                          <i class="fa fa-sign-out" style={{fontSize:"48px",color:"white",marginTop:"8px"}}></i>
                        </span>
                      </Link>
                      </a>
                  </div>
              </div>
              <div class= "sidebar">
              <div class="w3-sidebar w3-bar-block" style={{ width: "100px", borderRightStyle:"solid", borderRightWidth: "5", borderRightColor: "#04293A", overflowY: "hidden", overflowX:"hidden", backgroundColor:"#04293A"}}>
                <Link to="#main" onClick={() => this.onTabClick("main")} class ="sbb" style={{paddingLeft: "24px"}}><i class="fa fa-home" ></i> <br/><label style={{fontSize: "18px" }}>Home</label></Link>
                <Link to="#exams" onClick={() => this.onTabClick("exams")} class="sbb" style={{paddingLeft: "24px"}}><i class="fa fa-file"></i><br/><label style={{fontSize: "18px" }}>Exam</label></Link>
                <Link to="#questions" onClick={() => this.onTabClick("questions")} class="sbb" style={{paddingLeft: "13px"}}><i class="fa fa-comment"></i><br/><label style={{fontSize: "18px" }}>Questions</label></Link>
                <Link to="#calendar" onClick={() => this.onTabClick("calendar")} class="sbb" style={{paddingLeft: "16px"}}><i class="fa fa-calendar"></i><br/><label style={{fontSize: "18px" }}>Calendar</label></Link>
                <Link to="#help" onClick={() => this.onTabClick("help")} class="sbb" style={{paddingLeft: "35px"}}><i class="fa fa-info"></i><br/><label style={{fontSize: "18px" }}>Help</label></Link>
              </div>
              </div>
              <div class= "backg" style={{marginLeft: "105px"}}><br/>
                {this.drawTabs()}
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
