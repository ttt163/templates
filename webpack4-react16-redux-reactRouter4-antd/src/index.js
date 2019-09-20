/**
 * Author：tantingting
 * Time：2019/5/22
 * Description：Description
 */
import './css/public.scss'
import 'antd/dist/antd.css'

import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux'
import RootRouter from './router'
import store from './redux/store'

import {ConnectedRouter} from "connected-react-router";
import { createHashHistory } from 'history';
const history = createHashHistory();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootRouter />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
)
