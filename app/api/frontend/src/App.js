import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';

import { SampleList } from './samples';

// TODO: look for better restClient option to avoid excess data manipulation on
// backend?
// restClient is a function capable of translating REST commands into HTTP
// requests. Since REST isn't a standard, will have to provide custom client
// to connect to own APIs

// TODO: consider adding "sample icon"
// closest material-ui icon option can be found here: https://www.materialui.co/icon/opacity

// URL for jsonServerRestClient
////////////////////////////////
// TODO: determine if better alternative to this hack
var url = window.location.origin;

if (url.indexOf('3000') > -1){
  // when developing (on port 3000) use local flask (on port 5000)
  url = 'http://localhost:5000';
}

const App = () => (
    <Admin restClient={jsonServerRestClient(url)}>
        <Resource name="samples" list={SampleList} />
    </Admin>
);

export default App;