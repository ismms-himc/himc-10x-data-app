import React from 'react';
import { List, Datagrid, TextField, Filter, TextInput, FileField } from 'admin-on-rest';

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
            <TextField source="reference_transcriptome" label="Reference Transcriptome"/>
            <FileField source="web_summary_url" label="Web Summary" title="web_summary.html" sortable={false} />
        </Datagrid>
    </List>
);