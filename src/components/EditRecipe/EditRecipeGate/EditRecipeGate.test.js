import React from 'react';
import ReactDOM from 'react-dom';
import EditRecipeGate from './EditRecipeGate';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'

describe('EditRecipeGate component', () => {

    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>          
                        <EditRecipeGate/>
                    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
          .create(<BrowserRouter><EditRecipeGate/></BrowserRouter>)
          .toJSON();
        expect(tree).toMatchSnapshot();  
      });
});