import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const getData = async (fetchMethod) => {
  const todos = ((await (
    await fetchMethod('https://jsonplaceholder.typicode.com/todos')
  ).json())).slice(0, 5);

  return todos;
};

export const Home = ({ ssrData }) => {
  const [items, setItems] = useState(ssrData);

  useEffect(() => {
    if (ssrData) {
      return;
    }
    getData(fetch).then(setItems);
  }, [ssrData]);

  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Items</h1>
      <ul>
        {items.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/s/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
