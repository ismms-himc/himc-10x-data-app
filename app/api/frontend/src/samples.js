import React from 'react';
import { List, Datagrid, TextField } from 'admin-on-rest';

// import { List, Datagrid, TextField, Filter, TextInput } from 'admin-on-rest';

// TODO: check if unneeded "Add Filter" button appears on top


// TODO: will this be an issue?
// The first filter, 'q', takes advantage of a full-text functionality offered by 
// JSONPlaceholder. It is alwaysOn, so it always appears on the screen. 

{/* const SampleFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
); */}

{/*export const SampleList = (props) => (
    <List {...props} filters={<SampleFilter />}>
        <Datagrid>
            <TextField source="sample_id" />
        </Datagrid>
    </List>
);*/}

export const SampleList = function(props) {
	console.log("PROPS:");
	console.log(props);
	return (
		<List {...props} >
			<Datagrid>
				<TextField source="sample_id" />
			</Datagrid>
		</List>
		);
}