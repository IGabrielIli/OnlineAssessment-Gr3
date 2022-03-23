import React from 'react';
import TestQuestion from './Question';

class Test extends React.Component {
    render() {
        const descs = ["desc1\nlinetwo", "desc2", "desc3", "desc4", "desc5"]
        return (
            <div>
                <TestQuestion
                    buttonType={AnswerButtonType[1]} 
                    buttonNum={4} 
                    buttonDesc={descs} 
                    questionDesc={"Test question?"}
                    questionGroup={"ExampleGroup"}
                    horizontal={false} 
                />
            </div>
        );
    }
}
const AnswerButtonType = ["radio", "checkbox"];

export default Test;