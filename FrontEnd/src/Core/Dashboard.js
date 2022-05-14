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
                    <center><h2>{fetchDynamicItem(DBType.PROJECT_TITLE)} Documentation</h2></center>
                  </div>
               <div class='help-body'>

                  <main id="main-doc">
                    <section class="main-section" id='Exams'>
                      <h3>Create New Exam Page</h3>                      
                      <p>Creating an online Exam is very easy. Go to the <b>Exams</b> tab on your dashboard, and select <b>Create new exam</b>.</p>
                      <h4><b>On the Create New Exam tab you can:</b></h4>
                      <ul>
                        <li><b>Change the Exam title</b></li>
                        <li>Set a <b>password</b> for your Exam(optional)</li>
                        <li>Set a  <b>category</b> for your Exam</li>
                        <li>Set Question <b>Keywords</b></li>
                        <li>Set the <b>number of Questions</b> for your test</li>
                        <li>Set the <b>average Difficulty</b> for your test</li>
                        <li>Set a <b>timer </b>for your exam</li>
                      </ul>
                      <p>Click <b>Create</b> when you're done!</p>
                      <p>You can edit your Exam's information later through the <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg> at the <b>right side of each exam!</b></p>
                    </section>

                    <section class="main-section" id='Questions'>

                      <h3>Creating New Questions</h3>

                      <p>Now you can start Creating Questions for your Exam. Go to the <b>Questions</b> tab on your dashboard and click <b>Create New Question</b></p>
                      <h4><b>On the Create New Questions tab you can:</b></h4>
                      <ul>
                        <li>Add an <b>image</b> to accompany your question</li>
                        <li>Add <b>up to 10 possible answers</b></li>
                        <li>Mark <b>more than one answer as correct</b></li>
                        <li>Choose whether to <b>Show answers in the current order</b> or <b>Shuffle answers</b></li>
                        <li>Set Question's <b>difficulty</b></li>
                        <li>Set Question's <b>keywords</b></li>
                      </ul>
                      <p>Click <b>Save & Add new Question</b> to keep adding new Questions or <b>Save</b> when you're done</p>
                      <p>You can edit each question through the  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg> or view each Question individually by pressing the <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
</svg> button</p>
                    </section>
                    
                    <section class="main-section" id='Analyze'>
                      <h3>Analyze</h3>
                      <p>You can find the <b>Analytics of each exam</b> through the<b> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/></svg> </b> on the <b>right side of each exam!</b></p>
                      <h4><b>Inside Analyze Tab</b></h4>
                      <ul>
                        <li>You have an <b>umbrella view of all participant sessions</b></li>
                        <li>You can filter Sessions <b>by Date</b></li>
                        <li>You can filter Sessions <b>by Participant</b></li>
                      </ul>
                      <p>The <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg> button will take you <b>directly to the participant's results</b> for that <b>specific session.</b></p>
                    </section>
                  </main>
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
