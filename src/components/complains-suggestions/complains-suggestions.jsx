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
    useRefresh,
    useRedirect
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
            <TextField source="review" />
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
            <TextInput source="review" />
        </SimpleForm>
    </Edit>
)

export const ComplainsSuggestionsCreate = props => {
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = ({ data }) => {
        redirect(`/complains-suggestions`);
        refresh();
    };

    return (<Create onSuccess={onSuccess} {...props}>
        <SimpleForm>
            <TextInput source="review" />
        </SimpleForm>
    </Create>)
}