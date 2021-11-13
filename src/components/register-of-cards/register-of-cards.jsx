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

const registerOfCardsFilters = [
    <TextInput source="firstName" label="Search by first name" alwaysOn />,
    <ReferenceInput source="id" label="Filter by registration" reference="registerOfCards" allowEmpty>
        <SelectInput optionText="registration" />
    </ReferenceInput>,
]

export const RegisterOfCardsList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (<List filters={registerOfCardsFilters} {...props}>
        {isSmall ? (
            <SimpleList
                primaryText={record => record.firstName}
                secondaryText={record => `${record.lastName}`}
                tertiaryText={record => record.registration}
            />
        ) : (
        <Datagrid rowClick="edit">
            <NumberField source="id" />
            <TextField source="firstName" />
            <TextField source="surname" />
            <TextField source="lastName" />
            <TextField source="registration" />
            <EditButton />
        </Datagrid>
        )}
    </List>
    );
};

export const RegisterOfCardsEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="firstName" />
            <TextInput source="surname" />
            <TextInput source="lastName" />
            <TextInput source="registration" />
        </SimpleForm>
    </Edit>
)

export const RegisterOfCardsCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="firstName" />
            <TextInput source="surname" />
            <TextInput source="lastName" />
            <TextInput source="registration" />
        </SimpleForm>
    </Create>
)