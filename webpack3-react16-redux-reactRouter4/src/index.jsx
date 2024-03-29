/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：outer jsx
 */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'

import 'babel-polyfill'
import rootRoutes from './routers'
import store from './store/index'

import './public/index.scss'

const history = createHistory()

$('body').append('<div id="root"></div>')
render(<Provider store={store}>
    <Router history = {history}>
        {rootRoutes()}
    </Router>
</Provider>, document.getElementById('root'))
