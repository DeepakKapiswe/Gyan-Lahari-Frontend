import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import Input from "@material-ui/core/Input";

import AddUserResult from '../User/AddUser';

export default function SubscriberForm() {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState('');
  const [userResult, setUserResult] = useState(null);
  const onSubmit = data => {
    setUser(data);
    console.log(data);
  };
  useEffect(() => {
    if (user !== '') {
      setUserResult(<AddUserResult payload={user} />);
      setUser('');
    }
  }, [user]);

  function RenderResult(props) {
    if (props.result !== null) { return <>{userResult}</>}
      //  (<h1> </h1>) };
    return <h1>Add New User </h1>;
  }


  return (
    <>
      <RenderResult result={userResult} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="m" inputRef={register} />
        <input type="submit" />
      </form>
    </>
  );
}
