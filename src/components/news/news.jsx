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

const newsFilters = [
    <TextInput source="content" label="Search by content" alwaysOn />,
    <ReferenceInput source="id" label="Filter by id" reference="news" allowEmpty>
        <SelectInput optionText="id" />
    </ReferenceInput>,
]

export const NewsList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (<List filters={newsFilters} {...props}>
        {isSmall ? (
            <SimpleList
                primaryText={record => record.content}
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

export const NewsEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="content" />
        </SimpleForm>
    </Edit>
)

export const NewsCreate = props => {
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = ({ data }) => {
        redirect(`/news`);
        refresh();
    };

    return (<Create onSuccess={onSuccess} {...props}>
        <SimpleForm>
            <TextInput source="content" />
        </SimpleForm>
    </Create>)
}