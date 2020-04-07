import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'

describe('Make component', () => {
    

    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
                        <SignUp/>
                    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
          .create(
                <BrowserRouter>
                    <SignUp/>
                </BrowserRouter>)
          .toJSON();
        expect(tree).toMatchSnapshot();  
      });
});