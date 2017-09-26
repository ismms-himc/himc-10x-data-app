import React from 'react';
import NavigationContainer from './navigation/navigation_container';
import SampleIndexContainer from './samples/index/sample_index_container';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import HomeContainer from './home/home_container';
import { ProtectedRoute, RedirectLoggedInUserRoute } from '../util/route_util';
import Footer from './footer/footer';

{/*TODO: implement footer */}

const App = function () {
  return(
    <div>
      <header>
          <NavigationContainer />
      </header>
      <main>
        <Switch>
          <RedirectLoggedInUserRoute exact path="/" component={HomeContainer}/>
          <ProtectedRoute exact path="/samples" component={SampleIndexContainer}/>
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
