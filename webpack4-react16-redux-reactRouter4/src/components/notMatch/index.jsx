/**
 * Author：tantingting
 * Time：2019/5/22
 * Description：Description
 */

import React from 'react'
const NotMatch = ({ location=window.location }) => (
    <div>
        <h3>No Match for { location.pathname }</h3>
    </div>
);
export default NotMatch
