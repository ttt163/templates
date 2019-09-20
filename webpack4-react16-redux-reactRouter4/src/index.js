/**
 * Author：tantingting
 * Time：2019/5/22
 * Description：Description
 */
import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux'

import Routers from './router/router'
import store from './redux/store'

/*import { applyMiddleware, createStore} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'


import Routers from './router'
import reducers from './reducers'

const middleware = applyMiddleware(promise(), thunk)

const store = createStore(reducers, middleware)*/

render(
  <Provider store={store}>
    <Routers />
  </Provider>,
    document.getElementById("app")
)
