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
    ReferenceField,
} from 'react-admin';

const arrivalFilters = [
    <TextInput source="reason" label="Search by reason" alwaysOn />,
    <ReferenceInput source="id" label="Filter by id" reference="arrivals" allowEmpty>
        <SelectInput optionText="id" />
    </ReferenceInput>,
]

export const ArrivalsList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (<List {...props} filters={arrivalFilters}>
        {isSmall ? (
            <SimpleList
            primaryText={record => record.id}
            secondaryText={record => record.reason}
            tertiaryText={record => {}}
        />) : (
        <Datagrid rowClick="edit">
            <ReferenceField source="brigadesId" reference="brigade">
                <TextField source="nickName" />
            </ReferenceField>
            <ReferenceField source="registerOfCardsId" reference="register-of-cards">
                <TextField source="firstName" />
            </ReferenceField>
            <NumberField source="id" />            
            <TextField source="reason" />
            <EditButton />
        </Datagrid>
        )}
    </List>
)};

export const ArrivalsEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />            
            <TextInput source="reason" />
            <ReferenceInput source="brigadesId" reference="brigade">
                <SelectInput optionText="nickName" />
            </ReferenceInput>
            <ReferenceInput source="registerOfCardsId" reference="register-of-cards">
                <SelectInput optionText="firstName" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
)

export const ArrivalsCreate = props => (
    <Create {...props}>
        <SimpleForm>             
            <TextInput source="reason" />
            <ReferenceInput source="brigadesId" reference="brigade">
                <SelectInput optionText="nickName" />
            </ReferenceInput>
            <ReferenceInput source="registerOfCardsId" reference="register-of-cards">
                <SelectInput optionText="firstName" />
            </ReferenceInput>  
        </SimpleForm>
    </Create>
)