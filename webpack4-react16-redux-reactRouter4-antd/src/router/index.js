/**
 * Author：tantingting
 * Time：2019/7/2
 * Description：Description
 */
import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Main from  '../components/mainLayout'
import {pageRouters} from './config'

export default function RootRouter (superProps) {
  return (
    <Router>
      <Switch>
        {
          pageRouters.blankLayout.map((item, index) => (
            <Route exact
                   path={`${item.path}`} key={index} render={(props) => (
              <item.component {...props} {...superProps} />
            )} />
          ))
        }
        <Switch>
          <Main>
            {
              pageRouters.baseLayout.map((item, index) => (
                <Route exact
                       path={`${item.path}`} key={index} render={(props) => (
                  <item.component {...props} {...superProps} />
                )} />
              ))
            }
          </Main>
        </Switch>
      </Switch>
      <Route exact path='/' component={ () => <Redirect to={pageRouters.baseLayout[0].path} />  } />
    </Router>
  )
}
