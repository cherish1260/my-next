import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: props.initialRoute,
    };
  }

  componentDidMount() {
    const { route } = this.state;
    const { location } = this.props;
    if (!route) this.match(location);
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    if (location.pathname !== nextProps.location.pathname) {
      this.match(nextProps.location);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!nextState.route.path;
  }

  match = (location) => {
    const { routes, history } = this.props;
    const curRoute = matchRoutes(routes, location.pathname)
      .filter(route => route.match.isExact)
      .map(route => route.route)[0];

    if (curRoute && curRoute.component) {
      if (curRoute.component.prototype instanceof Component || curRoute._isLoaded) {
        this.updateRoute(curRoute);
      } else {
        this.updateRoute();
        curRoute.component().then((mod) => {
          curRoute.component = mod.default || mod;
          curRoute._isLoaded = true;
          this.updateRoute(curRoute);
        });
      }
    } else {
      history.replace('/error/404');
    }
  }

  updateRoute = (curRoute) => {
    if (!curRoute || !curRoute.component) {
      this.setState({ route: {} });
    } else {
      this.setState({ route: curRoute });
    }
  }

  render() {
    const { route } = this.state;
    return renderRoutes(route ? [route] : []);
  }
}

export default withRouter(Router);
