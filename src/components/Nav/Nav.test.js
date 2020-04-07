import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'

describe('Make component', () => {
    

    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
                        <Nav/>
                    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
          .create(
                <BrowserRouter>
                    <Nav/>
                </BrowserRouter>)
          .toJSON();
        expect(tree).toMatchSnapshot();  
      });
});