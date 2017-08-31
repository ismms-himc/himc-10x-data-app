import React from 'react';
import { List, Datagrid, TextField, Filter, TextInput } from 'admin-on-rest';
// import { List, TextField, Filter, TextInput } from 'admin-on-rest';
// import Datagrid from "/admin-on-rest-custom/Datagrid";


// TODO: check if unneeded "Add Filter" button appears on top

// TODO: will this be an issue?
// The first filter, 'q', takes advantage of a full-text functionality offered by 
// JSONPlaceholder. It is alwaysOn, so it always appears on the screen. 

const SampleFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);


// TODO: Reimplement the fat arrow syntax when debugging complete

{/*export const SampleList = (props) => (
    <List {...props} filters={<SampleFilter />} title="Samples">
        <Datagrid>
            <TextField source="sample_id" />
        </Datagrid>
    </List>
);*/}

export const SampleList = function(props) {
	console.log("PROPS:");
	console.log(props);
	return (
		<List {...props} filters={<SampleFilter />} title="My Samples">
			<Datagrid>
				<TextField source="sample_id" />
			</Datagrid>
		</List>
		);
}