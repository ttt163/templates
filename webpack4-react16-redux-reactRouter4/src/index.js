/**
 * Author：tantingting
 * Time：2019/5/22
 * Description：Description
 */
import React from 'react';
import { render } from 'react-dom';

import Routers from './router/router'

/*import { applyMiddleware, createStore} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'


import Routers from './router'
import reducers from './reducers'

const middleware = applyMiddleware(promise(), thunk)

const store = createStore(reducers, middleware)*/

render(
    <Routers />,
    document.getElementById("app")
)
