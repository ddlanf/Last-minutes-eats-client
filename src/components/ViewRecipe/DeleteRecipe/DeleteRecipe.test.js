import React from 'react';
import ReactDOM from 'react-dom';
import DeleteRecipe from './DeleteRecipe';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'

describe('Make component', () => {
    

    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
                        <DeleteRecipe/>
                    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
          .create(
                <BrowserRouter>
                    <DeleteRecipe/>
                </BrowserRouter>)
          .toJSON();
        expect(tree).toMatchSnapshot();  
      });
});