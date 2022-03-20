import React from 'react';
import ReactDOM from 'react-dom';
import TestQuestion from './question';
import './index.css';
const AnswerButtonType = ["radio", "checkbox"];

class App extends React.Component {
  render() {
    const descs = ["desc1\nlinetwo", "desc2", "desc3", "desc4", "desc5"]
    return (
      <div>
        <TestQuestion
          buttonType={AnswerButtonType[0]} 
          buttonNum={4} 
          buttonDesc={descs} 
          questionDesc={"Test question?"}
          questionGroup={"ExampleGroup"}
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

