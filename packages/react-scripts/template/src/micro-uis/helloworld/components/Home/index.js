/* @flow */
import React from 'react';
import { ReactA11yTitle } from 'react-ref-extensions';
import Tools from '../../../../shared';

const Home = () => (
  <div>
    <ReactA11yTitle title="Hello World Home" />
    <h1 level="1">Hello World Home Page</h1>
    <p>This is the Hello World home page</p>
    <p>
      See
      <a href="https://github.com/EBSCOIS/experiment.shared.ui/tree/MicroUI-Example">
        Micro-UI Branch
      </a>
      branch for a slightly more involved example of Micro UI code organization.
    </p>
    <p>
      And Example of a shared Tool
      <Tools.Email />
    </p>
  </div>
);

export default Home;
