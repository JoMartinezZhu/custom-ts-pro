import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';

function About({ history }: RouteComponentProps) {
  return (
    <div>
      <div>About Page</div>
      <Button
        onClick={() => {
          history.push('/');
        }}
      >
        click
      </Button>
    </div>
  );
}

export default About;
