import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const getData = async (
  fetchMethod,
  id
) => {
  const todo = (await (
    await fetchMethod(`https://jsonplaceholder.typicode.com/todos/${id}`)
  ).json());

  return todo;
};

export const User = ({ ssrData }) => {
  const [item, setItem] = useState(ssrData);
  const { id } = useParams();

  useEffect(() => {
    if (ssrData) {
      return;
    }
    getData(fetch, id).then(setItem);
  }, [ssrData, id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link to="/">Home</Link>
      <h1>{item.title}</h1>
      <p>{item.id}</p>
    </>
  );
};
