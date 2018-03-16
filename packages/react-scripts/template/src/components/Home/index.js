/* @flow */
import React from 'react';
import { ReactA11yTitle } from 'react-ref-extensions';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <ReactA11yTitle title="Application Home" />
    <h1>Application Home Page</h1>
    <ul>
      <li>
        <Link
          to={{
            pathname: '/hello',
            state: { lastClick: 'hello' },
          }}
        >
          Hello World MicroUI example
        </Link>
      </li>
    </ul>
  </div>
);

export default Home;
