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
    useQuery,
    AutocompleteArrayInput,
    useRefresh,
    useRedirect
} from 'react-admin';

const medicalPersonnelFilters = [
    <TextInput source="firstName" label="Search by first name" alwaysOn />,
    <ReferenceInput source="id" label="Medical personnel" reference="medical-personnel" allowEmpty>
        <SelectInput optionText="address" />
    </ReferenceInput>,
]

export const MedicalPersonnelList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (<List {...props} filters={medicalPersonnelFilters}>
        {isSmall ? (
            <SimpleList
            primaryText={record => record.firstName}
            secondaryText={record => `${record.surname}`}
            tertiaryText={record => `${record.lastName}`}
        />) : (
        <Datagrid rowClick="edit">
            <NumberField source="id" />
            <TextField source="firstName" />
            <TextField source="surname" />
            <TextField source="lastName" />
            <TextField source="address" />
            <TextField source="position" />
            {/* <ReferenceArrayField label="Medical personnel" reference="medical-personnel" source="">
                <SingleFieldList>
                    <ChipField source="firstName" />
                </SingleFieldList>
            </ReferenceArrayField> */}
            <EditButton />
        </Datagrid>
        )}
    </List>
)};

export const MedicalPersonnelEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="firstName" />
            <TextField source="surname" />
            <TextField source="lastName" />
            <TextField source="address" />
            <TextField source="position" />
        </SimpleForm>
    </Edit>
)

export const MedicalPersonnelCreate = props => {
    // const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = ({ data }) => {
        redirect(`/medical-personnel`);
        refresh();
        // notify(`Catalogue of services succesfully created!`);
  };

    const [catalogueOfServices, setComplexOfServices] = useState([]);
    const { data: catalogueOfServicesChoices } = useQuery({
        type:'getList',
        resource: 'catalogue-of-services',
        payload: {
            pagination: { page: 1, perPage: 600 },
            sort: { field: 'serviceDescription', order: 'ASC' },
            filter: {},
          },
    })

    const [patients, setPatients] = useState([]);
    const { data: patientsChoices } = useQuery({
        type:'getList',
        resource: 'patients',
        payload: {
            pagination: { page: 1, perPage: 600 },
            sort: { field: 'firstName', order: 'ASC' },
            filter: {},
          },
    })

    useEffect(() => {
        if(catalogueOfServicesChoices) setComplexOfServices(catalogueOfServicesChoices.map((item) => ({ id:item.id, name:item.serviceDescription })))
        if(patientsChoices) setPatients(patientsChoices.map((item) => ({ id:item.id, name:item.firstName })))
    }, [catalogueOfServicesChoices])

    return (
    <Create onSuccess={onSuccess} {...props} title='Create new medical personnel' onSuccess={onSuccess}>
        <SimpleForm>             
            <TextInput source="firstName" />
            <TextInput source="surname" />
            <TextInput source="lastName" />
            <TextInput source="address" />
            <TextInput source="position" />
            <AutocompleteArrayInput 
            parse={value =>
                value && value.map(v => ({ id: v }))
            }
            format={value => value && value.map(v => v.id)}            
            source="catalogueOfServices" choices={catalogueOfServices} />
            <AutocompleteArrayInput 
            parse={value =>
                value && value.map(v => ({ id: v }))
            }
            format={value => value && value.map(v => v.id)}            
            source="patients" choices={patients} />
        </SimpleForm>
    </Create>
)}