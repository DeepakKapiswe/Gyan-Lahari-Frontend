import React from 'react';
import useFetch from '../../Common/UseFetchSuspense';

export default function Users(props) {
    let url ='http://localhost:7000/item/';
    // let url ='http://192.168.43.28:7000/item/';
    // let url2 = 'https://jsonplaceholder.typicode.com/todos/1';
    const result = useFetch(url); // { mode: 'no-cors'});
    return (
      <>
      
    <h1>{result.itemText}</h1>
    <h1>{result.itemId}</h1>
<h1> SuccessFull</h1>
      </>);
  }
  