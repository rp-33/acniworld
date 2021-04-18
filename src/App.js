import React,{Fragment} from 'react';
import { Router, Route,Switch} from 'react-router-dom';
import history from './routes/history';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Home from './views/Home/';
import Blog from './views/Blog/';
import Dashboard from './views/Dashboard/';
import Password from './views/Password/';
import NoMatch from './components/NoMatch/';

const App = ()=> {
  return (
  <Fragment>
    <Router history={history}> 	
      <Switch>
        <PublicRoute
          exact
          path="/"
          component={Home}
        />
        <PublicRoute
          path="/blog/:id"
          component={Blog}
        />
        <PublicRoute
          exact
          path="/password"
          component={Password}
        />
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
        />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </Fragment>
  )
}

export default App;
