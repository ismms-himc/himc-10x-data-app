import React from 'react';
import { List, Datagrid, TextField, Filter, TextInput } from 'admin-on-rest';
// import { List, TextField, Filter, TextInput } from 'admin-on-rest';
// import Datagrid from "./admin-on-rest-custom/mui/list/Datagrid";


// TODO: check if unneeded "Add Filter" button appears on top

// TODO: will this be an issue?
// The first filter, 'q', takes advantage of a full-text functionality offered by 
// JSONPlaceholder. It is alwaysOn, so it always appears on the screen. 

const SampleFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);



export const SampleList = (props) => (
    <List {...props} filters={<SampleFilter />} title="Samples">
        <Datagrid>
            <TextField source="sample_id" label="Sample ID"/>
        </Datagrid>
    </List>
);
