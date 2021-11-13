import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    EditButton,
    TextInput,
    SimpleForm,
    Create,
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleList,
} from 'react-admin';

const complainsSuggestionsFilters = [
    <TextInput source="review" label="Search by review" alwaysOn />,
    <ReferenceInput source="id" label="Filter by id" reference="complains-suggestions" allowEmpty>
        <SelectInput optionText="id" />
    </ReferenceInput>,
]

export const ComplainsSuggestionsList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (<List filters={complainsSuggestionsFilters} {...props}>
        {isSmall ? (
            <SimpleList
                primaryText={record => record.review}
                secondaryText={record => `${record.id}`}
                tertiaryText={record => ""}
            />
        ) : (
        <Datagrid rowClick="edit">
            <NumberField source="id" />
            <TextField source="content" />
            <EditButton />
        </Datagrid>
        )}
    </List>
    );
};

export const ComplainsSuggestionsEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="content" />
        </SimpleForm>
    </Edit>
)

export const ComplainsSuggestionsCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="content" />
        </SimpleForm>
    </Create>
)