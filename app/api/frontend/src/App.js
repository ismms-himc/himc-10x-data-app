import React from 'react';
import { Admin, Resource } from 'admin-on-rest';

import { SampleList } from './samples';

// TODO: get a real restClient!!!
// restClient is a function capable of translating REST commands into HTTP
// requests. Since REST isn't a standard, will have to provide custom client
// to connect to own APIs

// TODO: consider adding "sample icon"
// closest material-ui icon option can be found here: https://www.materialui.co/icon/opacity

const App = () => (
    <Admin restClient={jsonServerRestClient('http://jsonplaceholder.typicode.com')}>
        <Resource name="samples" list={SampleList} />
    </Admin>
);

export default App;