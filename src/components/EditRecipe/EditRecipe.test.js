import React from 'react';
import ReactDOM from 'react-dom';
import EditRecipe from './EditRecipe';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../../reducers/index'

describe('EditRecipe component', () => {

   const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>   
                      <Provider store={store}>
                        <EditRecipe/>
                      </Provider>
                    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
          .create(
          <BrowserRouter>   
            <Provider store={store}>
              <EditRecipe/>
            </Provider>
          </BrowserRouter>)
          .toJSON();
        expect(tree).toMatchSnapshot();  
      });
});