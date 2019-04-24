import React from 'react';
import { render } from 'react-dom';
import Frame from 'frame';
import Main from './sys';

class App extends React.Component {
  render() {
    console.log('app props:', this.props);
    return (
      <Frame>
        <Main />
      </Frame>
    );
  }
}
render(<App />, document.getElementById('root'));
