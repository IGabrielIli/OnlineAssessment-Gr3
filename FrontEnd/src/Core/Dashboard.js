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
            <h2 style={{marginLeft:"45px"} }>Learn <Link to="#help" onClick={() => this.onTabClick("help")}>how to create your own Exam</Link> or <Link to="#create" onClick={() => this.onTabClick("newexam")}>create one now</Link></h2><br/><br/>
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
            <h2 style={{marginLeft: "60px"}}>Your Exams </h2>
              <button class="createassess"style={{marginLeft:"1500px"}}onClick={() => this.onTabClick("newexam")}>Create New</button>
            </div>
            <hr class="solid"/>
            <div class="assessExam">
              {this.drawAssessments()}
            </div>
          </div>
        );
      case "newexam":
        return(
          <div>
            <div class="hello">
              <h2 style={{marginLeft: "60px"}}>New Exam </h2>
            </div>
            <div class="submitquestiondiv">
                <button class="submitquestionbtn" type="button" style={{color:"#04293A"}} >Submit Exam</button>
              </div>
              <br></br>
            <hr class="solid"/>
            
              <div class="examdetailsdivs">
                <label class="examdetailslabels">Exam Title:*</label><br></br>
                <input type="text" class="newexamdetails"></input>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <div class="examdetailsdivs">
                <label class="examdetailslabels">Password:</label><br></br>
                <input type="text" class="newexamdetails"></input>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <div class="examdetailsdivs">
                <label class="examdetailslabels">Keywords:</label><br></br>
                <input type="text" class="newexamdetails"></input>
              </div>
            </div>
          
        );
      case "questions":
        return(
          <div>
            <div class="hello">
            <h2 style={{marginLeft: "60px"}}>Your Questions </h2>
              <button class="createassess"style={{marginLeft:"1500px"}} onClick={() => this.onTabClick("newquestion")}>Create New</button>
            </div>
            <hr class="solid"/>
            <div class="assessExam">
              {this.drawAssessments()}
            </div>
           </div>
        );
      case "newquestion":
        return(
          <div>
            <div class="hello">
              <h2 style={{marginLeft: "60px"}}>New Question </h2>
            </div>
            <div class="submitquestiondiv">
                <button class="submitquestionbtn" type="button" style={{color:"#04293A"}} >Submit Question</button>
              </div>
              <br></br>
            <hr class="solid"/>
            <div>
              <label style={{color:"white",marginLeft:"20px",fontSize:"20px"}}>Type your Question</label><br></br>
              <textarea class="questioninput"></textarea><br></br>
              <a href="#" class="questiontoolbar">
                <Link to="#notifications" onClick={() => this.onTabClick("")}>
                  <span class="fa-stack" style={{fontSize:"28px",marginTop:"5px",marginLeft:"20px"}}>
                      <i class="fa fa-bold" style={{color: "white"}}></i>
                  </span>
                </Link>
              </a>
              <a href="#" class="questiontoolbar">
                <Link to="#notifications" onClick={() => this.onTabClick("")}>
                  <span class="fa-stack" style={{fontSize:"28px",marginTop:"5px"}}>
                      <i class="fa fa-underline" style={{color: "white"}}></i>
                  </span>
                </Link>
              </a>
              <a href="#" class="questiontoolbar">
                <Link to="#notifications" onClick={() => this.onTabClick("")}>
                  <span class="fa-stack" style={{fontSize:"28px",marginTop:"5px"}}>
                      <i class="fa fa-italic" style={{color: "white"}}></i>
                  </span>
                </Link>
              </a>
              <a href="#" class="questiontoolbar">
                <Link to="#notifications" onClick={() => this.onTabClick("")}>
                  <span class="fa-stack" style={{fontSize:"28px",marginTop:"5px"}}>
                      <i class="fa fa-list-ul" style={{color: "white"}}></i>
                  </span>
                </Link>
              </a>
              <a href="#" class="questiontoolbar">
                <Link to="#notifications" onClick={() => this.onTabClick("")}>
                  <span class="fa-stack" style={{fontSize:"28px",marginTop:"5px"}}>
                      <i class="fa fa-superscript" style={{color: "white"}}></i>
                  </span>
                </Link>
              </a>
              <a href="#" class="questiontoolbar">
                <Link to="#notifications" onClick={() => this.onTabClick("")}>
                  <span class="fa-stack" style={{fontSize:"28px",marginTop:"5px"}}>
                      <i class="fa fa-trash" style={{color: "white"}}></i>
                  </span>
                </Link>
              </a>
            </div>
            <div>
                <h3 class="typeyouranswers">Type your Answers</h3>
                <button class="addanswerbtn" type="button" style={{color:"#04293A"}} onClick={ () => this.handleAddAnswer() }>Add Answer</button>
              </div>
            <div class="answersdiv">
              <div class="question_tab">
              {this.drawCurrentAnswers()}
              <br/><br/>
            </div>
            
            </div >
            <div class="questiondiffdiv">
              <h3 class="QuestionDifficulty">Question Difficulty</h3>
              <div class="difficultyradiobtns">
                <input type="radio" id="html" name="fav_language" value="HTML"></input>
                <label for="html" class="radiolabels">1</label><br></br>
                <input type="radio" id="css" name="fav_language" value="CSS"></input>
                <label for="css" class="radiolabels">2</label><br></br>
                <input type="radio" id="javascript" name="fav_language" value="JavaScript"></input>
                <label for="javascript" class="radiolabels">3</label><br></br>
                <input type="radio" id="css" name="fav_language" value="CSS"></input>
                <label for="css" class="radiolabels">4</label><br></br>
                <input type="radio" id="javascript" name="fav_language" value="JavaScript"></input>
                <label for="javascript" class="radiolabels">5</label>
              </div>
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
          <textarea class="answer"onChange={ (e) => this.handleAnswerChange(e, id) }></textarea>
          <br></br>
          <a href="#" class="questiontoolbar">
                <Link to="#notifications" onClick={() => this.onTabClick("")}>
                  <span class="fa-stack" style={{fontSize:"17px",marginTop:"5px"}}>
                      <i class="fa fa-bold" style={{color: "white"}}></i>
                  </span>
                </Link>
              </a>
              <a href="#" class="questiontoolbar">
                <Link to="#notifications" onClick={() => this.onTabClick("")}>
                  <span class="fa-stack" style={{fontSize:"17px",marginTop:"5px"}}>
                      <i class="fa fa-underline" style={{color: "white"}}></i>
                  </span>
                </Link>
              </a>
              <a href="#" class="questiontoolbar">
                <Link to="#notifications" onClick={() => this.onTabClick("")}>
                  <span class="fa-stack" style={{fontSize:"17px",marginTop:"5px"}}>
                      <i class="fa fa-italic" style={{color: "white"}}></i>
                  </span>
                </Link>
              </a>
              <a href="#" class="questiontoolbar">
                <Link to="#notifications" onClick={() => this.onTabClick("")}>
                  <span class="fa-stack" style={{fontSize:"17px",marginTop:"5px"}}>
                      <i class="fa fa-list-ul" style={{color: "white"}}></i>
                  </span>
                </Link>
              </a>
              <a href="#" class="questiontoolbar">
                <Link to="#notifications" onClick={() => this.onTabClick("")}>
                  <span class="fa-stack" style={{fontSize:"17px",marginTop:"5px"}}>
                      <i class="fa fa-superscript" style={{color: "white"}}></i>
                  </span>
                </Link>
              </a>
              <a href="#" class="questiontoolbar">
                <Link to="#notifications" onClick={() => this.onTabClick("")}>
                  <span class="fa-stack" style={{fontSize:"17px",marginTop:"5px"}}>
                      <i class="fa fa-trash" style={{color: "white"}}></i>
                  </span>
                </Link>
              </a>
          <span class="checkmark" style={{marginRight:"28px"}} />
        </label>
        
        
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
