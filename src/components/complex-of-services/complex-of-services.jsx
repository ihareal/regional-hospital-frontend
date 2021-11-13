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
    ReferenceArrayField,
    ChipField,
    SingleFieldList,
    useQuery,
    AutocompleteArrayInput,
    useNotify,
    useRefresh,
    useRedirect
} from 'react-admin';

const complexOfServicesFilters = [
    <TextInput source="description" label="Search by description" alwaysOn />,
    <ReferenceInput source="id" label="Complex of services" reference="complex-of-services" allowEmpty>
        <SelectInput optionText="totalCost" />
    </ReferenceInput>,
]

export const ComplexOfServicesList = props => {
    
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    // const { data: medicalPersonnels } = useQuery({
    //     type:'getList',
    //     resource: 'medical-personnel',
    //     payload: {
    //         pagination: { page: 1, perPage: 600 },
    //         sort: { field: 'firstName', order: 'ASC' },
    //         filter: {},
    //       },
    // })

    // if (medicalPersonnels){
    //     const medicalPersonnelsIds = medicalPersonnels.map((item) => item['id']);
    //     console.log(medicalPersonnelsIds)
    // }

    return (<List {...props} filters={complexOfServicesFilters}>
        {isSmall ? (
            <SimpleList
            primaryText={record => record.description}
            secondaryText={record => `${record.totalCost}`}
            tertiaryText={record => ""}
        />) : (
        <Datagrid rowClick="edit">
            <NumberField source="id" />
            <TextField source="description" />
            <TextField source="totalCost" />
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

export const ComplexOfServicesEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="description" />
            <TextInput source="totalCost" />
        </SimpleForm>
    </Edit>
)

export const ComplexOfServicesCreate = props => {
    // const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = ({ data }) => {
        redirect(`/catalogue-of-services?filter=%7B"id"%3A"${data.id}"%7D`);
        refresh();
        // notify(`Catalogue of services succesfully created!`);
  };

    const [catalogueOfServices, setComplexOfServices] = useState([]);
    const { data: catalogueOfServicesChoices } = useQuery({
        type:'getList',
        resource: 'catalogue-of-services',
        payload: {
            pagination: { page: 1, perPage: 600 },
            sort: { field: 'description', order: 'ASC' },
            filter: {},
          },
    })

    useEffect(() => {
        if(catalogueOfServicesChoices) setComplexOfServices(catalogueOfServicesChoices.map((item) => ({ id:item.id, name:item.description })))
    }, [catalogueOfServicesChoices])

    return (
    <Create {...props} title='Create new catalogue of services' onSuccess={onSuccess}>
        <SimpleForm>             
            <TextInput source="description" />
            <TextInput source="totalCost" />
            <AutocompleteArrayInput 
            parse={value =>
                value && value.map(v => ({ id: v }))
            }
            format={value => value && value.map(v => v.id)}            
            source="catalogueOfServices" choices={catalogueOfServices} />
        </SimpleForm>
    </Create>
)}