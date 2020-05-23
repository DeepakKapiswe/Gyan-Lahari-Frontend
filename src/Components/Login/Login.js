import React from 'react';
import SignIn from '../SignIn/SignIn';
import { FullWidthTabs } from '../Tab/Tab';

function Login () {
    return (
        <FullWidthTabs
          v1={<SignIn user="Customer" /> }
          v2={<SignIn user="Distributer" />}
          v3={<SignIn user="Admin" />}
        />
    );
}

export default Login;