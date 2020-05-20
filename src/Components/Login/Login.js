import React from 'react';
import SignIn from '../SignIn/SignIn';
import { FullWidthTabs } from '../Tab/Tab';
import FlowerDiv from '../FlowerDiv/FlowerDiv';

function Login () {
    return (
        <FullWidthTabs
          v1={<><SignIn user="Customer" /> <FlowerDiv/></>}
          v2={<><SignIn user="Distributer" /><FlowerDiv/></>}
          v3={<><SignIn user="Admin" /><FlowerDiv/></>}
        />
    );
}

export default Login;