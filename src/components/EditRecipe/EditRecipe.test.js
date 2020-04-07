import React from 'react';
import ReactDOM from 'react-dom';
import EditRecipe from './EditRecipe';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'

describe('Edit component', () => {

    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>          
                        <EditRecipe/>
                    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
          .create(<BrowserRouter><EditRecipe/></BrowserRouter>)
          .toJSON();
        expect(tree).toMatchSnapshot();  
      });
});