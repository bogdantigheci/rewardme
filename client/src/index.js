import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers/reducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import { getUsers } from './actions/users';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// store.dispatch(getUsers());

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
