import React from 'react';
import { render } from 'react-dom';
import Frame from 'frame';
import { Router as BrowserRouter } from 'react-router';
import { createBrowserHistory } from 'history';
import Router from 'router';
import routes from 'sys/route';

const history = createBrowserHistory();
class App extends React.Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <Frame>
          <Router routes={routes} />
        </Frame>
      </BrowserRouter>
    );
  }
}
render(<App />, document.getElementById('root'));
