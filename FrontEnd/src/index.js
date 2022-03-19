import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const AnswerButtonType = ["radio", "checkbox"];

class AnswerButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        <input type={this.props.buttonType} name={this.props.questionGroup}/>{this.props.description}
      </React.Fragment>
    );
  }
}
class Question extends React.Component {
  render() {
    var indents = [];
    for (var i = 0; i < this.props.buttonNum; i++) {
      if (this.props.horizontal) {
        indents.push(
          <AnswerButton
            buttonType={this.props.buttonType}
            questionGroup="test" 
            description={this.props.buttonDesc[i]} 
          />
        );
      } else {
        indents.push(
          <div>
            <AnswerButton
              buttonType={this.props.buttonType}
              questionGroup="test" 
              description={this.props.buttonDesc[i]} 
            />
          </div>
        );
      }
    }
    return (
      <div> 
        {this.props.questionDesc}
        {indents}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    const descs = ["desc1", "desc2", "desc3", "desc4", "desc5"]
    return (
      <div>
        <Question
          buttonType={AnswerButtonType[0]} 
          buttonNum={4} 
          buttonDesc={descs} 
          questionDesc={"Test question?"}
          horizontal={false} 
        />
        <button class="button">Test</button>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

