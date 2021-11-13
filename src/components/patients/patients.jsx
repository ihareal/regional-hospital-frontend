import React, { useState, useEffect } from "react";
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
    useRedirect,
    useQuery,
    AutocompleteArrayInput
} from 'react-admin';

const patientsFilters = [
    <TextInput source="firstName" label="Search" alwaysOn />,
    <ReferenceInput source="id" label="Filter by address" reference="patients" allowEmpty>
        <SelectInput optionText="address" />
    </ReferenceInput>,
]

export const PatientsList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (<List filters={patientsFilters} {...props}>
        {isSmall ? (
            <SimpleList
                primaryText={record => record.firstName}
                secondaryText={record => `${record.lastName}`}
                tertiaryText={record => record.address}
            />
        ) : (
        <Datagrid rowClick="edit">
            <NumberField source="id" />
            <TextField source="firstName" />
            <TextField source="surname" />
            <TextField source="lastName" />
            <TextField source="address" />
            <TextField source="contacts" />
            <EditButton />
        </Datagrid>
        )}
    </List>
    );
};

export const PatientsEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="firstName" />
            <TextInput source="surname" />
            <TextInput source="lastName" />
            <TextInput source="address" />
            <TextInput source="contacts" />
        </SimpleForm>
    </Edit>
)

export const PatientsCreate = props => {

    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = ({ data }) => {
        redirect(`/patients?filter=%7B"id"%3A"${data.id}"%7D`);
        refresh();
        // notify(`Catalogue of services succesfully created!`);
  };

  const [medicalPersonnels, setMedicalPersonnels] = useState([]);
    const { data: medicalPersonnelsChoices } = useQuery({
        type:'getList',
        resource: 'medical-personnel',
        payload: {
            pagination: { page: 1, perPage: 600 },
            sort: { field: 'firstName', order: 'ASC' },
            filter: {},
          },
    })

    useEffect(() => {
        if(medicalPersonnelsChoices) setMedicalPersonnels(medicalPersonnelsChoices.map((item) => ({ id:item.id, name:item.firstName })))
    }, [medicalPersonnelsChoices])

    return (<Create {...props}>
        <SimpleForm>
            <TextInput source="firstName" />
            <TextInput source="surname" />
            <TextInput source="lastName" />
            <TextInput source="address" />
            <TextInput source="contacts" />
            <AutocompleteArrayInput 
            parse={value =>
                value && value.map(v => ({ id: v }))
            }
            format={value => value && value.map(v => v.id)}
            source="medicalPersonnels" choices={medicalPersonnels} />
        </SimpleForm>
    </Create>
)}