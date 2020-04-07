import React from 'react';
import ReactDOM from 'react-dom';
import ViewRecipe from './ViewRecipe';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'
 
export function FontAwesomeIcon(props) {
    return <i className="fa"/>
}

describe('Make component', () => {


    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
                        <ViewRecipe/>
                    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
          .create(
                <BrowserRouter>
                    <ViewRecipe/>
                </BrowserRouter>)
          .toJSON();
        expect(tree).toMatchSnapshot();  
      });
});