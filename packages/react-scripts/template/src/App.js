import React, { Component } from 'react';
import ReactSVG from 'react-svg';

import styles from './App.css';

class App extends Component {
  render() {
    console.log(JSON.stringify(styles));
    return (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <ReactSVG className={styles.appLogo} path="./logo.svg" alt="logo" />
          <h1 className={styles.appTitle}>Welcome to React</h1>
        </header>
        <p className={styles.appIntro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
