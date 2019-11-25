import React from 'react';
import useFetch from '../../Common/UseFetchSuspense';

export default function Users(props) {
    let url ='http://localhost:7000/user';
    let url2 ='http://192.168.43.28:7000/';
    // let url ='http://192.168.43.28:7000/item/';
    let url4 = 'https://jsonplaceholder.typicode.com/todos/1';
    const result = useFetch(url2); // { mode: 'no-cors'});
    const items = result.map((item)=> <h2>{item.m} </h2>);
    return (
      <>
      
    {/* <h1>{result.itemId}</h1> */}
    {items}
      </>);
  }
  