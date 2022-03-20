import React from 'react';
import './question.css';

class AnswerButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        <label for={this.props.buttonId}>
          <input id={this.props.buttonId} type={this.props.buttonType} name={this.props.questionGroup}/>
          <span>{this.props.description}</span>
        </label>
      </React.Fragment>
    );
  }
}
class TestQuestion extends React.Component {
  render() {
    var indents = [];
    for (var i = 0; i < this.props.buttonNum; i++) {
      var bt = <AnswerButton
        buttonType={this.props.buttonType}
        buttonId={this.props.questionGroup + i.toString()}
        questionGroup="test" 
        description={this.props.buttonDesc[i]} 
      />
      indents.push(
        <div>
          {bt}
        </div>
      );
    }
    return (
      <div> 
        {this.props.questionDesc} <br /> 
        {indents}
      </div>
    );
  }
}

export default TestQuestion;