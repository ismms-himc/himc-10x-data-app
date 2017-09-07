import React from 'react';
import NavigationContainer from './navigation/navigation_container';
import Footer from './footer/footer';

const App = function (props) {
  return(
    <div className='wrap'>
      <div className='app-nav-and-content-container'>
          <NavigationContainer />
          { props.children }
      </div>
      <div className='app-footer'>
        <Footer />
      </div>
    </div>
  );
};

export default App;
