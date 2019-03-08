import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('App', () => {
  context('when it renders', () => {
    it('should not crash', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
