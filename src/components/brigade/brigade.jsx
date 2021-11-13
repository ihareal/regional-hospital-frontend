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

const brigadeFilters = [
    <TextInput source="nickName" label="Search by nickname" alwaysOn />,
    <ReferenceInput source="id" label="Filter by brigade" reference="brigade" allowEmpty>
        <SelectInput optionText="id" />
    </ReferenceInput>,
]

export const BrigadeList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (<List filters={brigadeFilters} {...props}>
        {isSmall ? (
            <SimpleList
                primaryText={record => record.id}
                secondaryText={record => `${record.nickName}`}
                tertiaryText={record => ""}
            />
        ) : (
        <Datagrid rowClick="edit">
            <NumberField source="id" />
            <TextField source="nickName" />
            <EditButton />
        </Datagrid>
        )}
    </List>
    );
};

export const BrigadeEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="nickName" />
        </SimpleForm>
    </Edit>
)

export const BrigadeCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="nickName" />
        </SimpleForm>
    </Create>
)