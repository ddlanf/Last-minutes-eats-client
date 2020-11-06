import React from 'react';
import ReactDOM from 'react-dom';
import ViewRecipe from './ViewRecipe';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../../reducers/index'

export function FontAwesomeIcon(props) {
    return <i className="fa"/>
}

describe('Make component', () => {

    const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>   
                        <Provider store={store}>
                            <ViewRecipe/>
                        </Provider>
                    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
    });

    global.scrollTo = jest.fn()

    it('renders the UI as expected', () => {
        const tree = renderer
          .create(
            <BrowserRouter>   
                <Provider store={store}>
                    <ViewRecipe/>
                </Provider>
            </BrowserRouter>)
          .toJSON();
        expect(tree).toMatchSnapshot();  
      });
});