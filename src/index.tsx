import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';

import Home from '@pages/Home';

import styles from './index.scss';

function App() {
  return (
    <div className={styles.test}>
      app
      <div>
        <Home />I am a tester I am a tester I am a tester
      </div>
      <Button type="primary">click</Button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
