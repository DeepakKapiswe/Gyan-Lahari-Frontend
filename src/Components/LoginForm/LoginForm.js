import React from 'react';
import SignIn from '../SignIn/SignIn';
import { FullWidthTabs } from '../Tab/Tab';

export default function LoginForm (props) {
    return (
        <FullWidthTabs
          v1={<SignIn user="Subscriber"  userRole="Subscriber" {...props} />}
          v2={<SignIn user="Distributor" userRole="Distributor" {...props} />}
          v3={<SignIn user="Admin" {...props} />}
        />
    );
}