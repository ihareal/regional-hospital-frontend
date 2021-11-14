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
    useRedirect,
    ArrayField,
} from 'react-admin';

const complexOfServicesFilters = [
    <TextInput source="description" label="Search by description" alwaysOn />,
    <ReferenceInput source="id" label="Complex of services" reference="complex-of-services" allowEmpty>
        <SelectInput optionText="totalCost" />
    </ReferenceInput>,
]

export const ComplexOfServicesList = props => {
    
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));    
    const [complexOfServicesIds, setComplexOfServices] = useState([]);
    const { data: complexOfServicesChoices } = useQuery({
        type:'getList',
        resource: 'complex-of-services',
        payload: {
            pagination: { page: 1, perPage: 600 },
            sort: { field: 'description', order: 'ASC' },
            filter: {},
          },
    })

    useEffect(() => {        
        if(complexOfServicesChoices) setComplexOfServices(complexOfServicesChoices.map((item) => item.catalogueOfServices.map((childCatalogue) => childCatalogue.id)))
    }, [complexOfServicesChoices])
    
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
            {/* <ArrayField source="catalogueOfServices" fieldKey="id">
                <Datagrid>
                 <TextField source="serviceDescription" />
                </Datagrid>
            </ArrayField> */}
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
        redirect(`/complex-of-services`);
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