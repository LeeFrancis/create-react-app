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
      It shows how each subsection of the app (MicroUI) can have its own route,
      components, containers and reducer handling A CodeOwners file can be
      created at the route that will specify the owners for this section of the
      app.
    </p>
    <p>
      And Example of a shared Tool
      <Tools.Email />
    </p>
  </div>
);

export default Home;
