/**
 * Author：tantingting
 * Time：2019/7/2
 * Description：Description
 */
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Main from  '../components/mainLayout'
import {pageRouter} from './config'

export default function RootRouter (superProps) {

    return (
        <Router>
          <Main>
            <div className="page-warp">
              <Switch>
                {
                  pageRouter.map((item, index) => (
                    <Route exact path={item.path} key={index} render={(props) => (
                      <item.component {...props} {...superProps} />
                    )} />
                  ))
                }

                {/*<Route exact path="/refundOrder" render={(props) => (
                  <RefundOrder {...props} {...superProps} />
                )} />*/}
              </Switch>
            </div>
          </Main>
        </Router>
    )
}

