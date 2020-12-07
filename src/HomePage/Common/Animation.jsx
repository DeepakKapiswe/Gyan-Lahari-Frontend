import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import useWindowPosition from '../Hooks/AnimationHook';

export default function Animated ({animationStartId, timeout, ...props}) {
    const checked = useWindowPosition(animationStartId);
    return (
       <Collapse
        in={checked}
        {...(checked ? { timeout: timeout } : {})}
      >
          {props.children}
      </Collapse>
    );
}