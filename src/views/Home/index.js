import React, { useEffect } from 'react';

export default function Home({ history }) {
  useEffect(() => {
    history.push('/mine');
  }, []);

  return <div />;
}
