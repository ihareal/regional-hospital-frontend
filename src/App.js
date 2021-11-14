import * as React from "react";
import { Admin, Resource, ShowGuesser, AppBar } from 'react-admin';
import crudProvider from 'ra-data-nestjsx-crud'
import { PatientsList, PatientsEdit, PatientsCreate } from "./components/patients";
import { BrigadeMedicalPersonnelList, BrigadeMedicalPersonnelEdit, BrigadeMedicalPersonnelCreate } from './components/brigade-medical-personnel';
import { NewsList, NewsEdit, NewsCreate } from "./components/news";
import { RegisterOfCardsCreate, RegisterOfCardsEdit, RegisterOfCardsList } from "./components/register-of-cards";
import { BrigadeList, BrigadeEdit, BrigadeCreate } from "./components/brigade";
import { ArrivalsList, ArrivalsEdit, ArrivalsCreate } from "./components/arrivals";
import { CardList, CardEdit, CardCreate } from "./components/cards";
import { ComplainsSuggestionsEdit, ComplainsSuggestionsList, ComplainsSuggestionsCreate } from "./components/complains-suggestions/complains-suggestions";
import { CatalogueOfServicesList, CatalogueOfServicesEdit, CatalogueOfServicesCreate } from "./components/catalogue-of-services";
import { ComplexOfServicesList, ComplexOfServicesCreate, ComplexOfServicesEdit } from './components/complex-of-services';
import { DepartmentsList, DepartmentsCreate, DepartmentsEdit } from "./components/departments";
import { MedicalPersonnelList, MedicalPersonnelEdit, MedicalPersonnelCreate } from './components/medical-personnel';
import { CustomLayout } from "./components/layout/layout";
import { CustomTheme } from './components/theme/theme';

const dataProvider = crudProvider('http://localhost:3000');
const App = () => (
    <Admin theme={CustomTheme} layout={CustomLayout} dataProvider={dataProvider}>
      <Resource name="patients" list={PatientsList} show={ShowGuesser} edit={PatientsEdit} create={PatientsCreate}/>
      <Resource name="brigade-medical-personnel" list={BrigadeMedicalPersonnelList} show={ShowGuesser} edit={BrigadeMedicalPersonnelEdit} create={BrigadeMedicalPersonnelCreate}/>
      <Resource name="register-of-cards" list={RegisterOfCardsList} show={ShowGuesser} create={RegisterOfCardsCreate} edit={RegisterOfCardsEdit} />
      <Resource name="brigade" list={BrigadeList} show={ShowGuesser} edit={BrigadeEdit} create={BrigadeCreate}/>
      <Resource name="arrivals" list={ArrivalsList} show={ShowGuesser} edit={ArrivalsEdit} create={ArrivalsCreate} />
      <Resource name="cards" list={CardList} show={ShowGuesser} edit={CardEdit} create={CardCreate}/>
      <Resource name="catalogue-of-services" list={CatalogueOfServicesList} show={ShowGuesser} edit={CatalogueOfServicesEdit} create={CatalogueOfServicesCreate} /> 
      <Resource name="complex-of-services" list={ComplexOfServicesList} show={ShowGuesser} edit={ComplexOfServicesEdit} create={ComplexOfServicesCreate} />
      <Resource name="medical-personnel" list={MedicalPersonnelList} show={ShowGuesser} edit={MedicalPersonnelEdit} create={MedicalPersonnelCreate}/>
      <Resource name="departments" list={DepartmentsList} show={ShowGuesser} edit={DepartmentsEdit} create={DepartmentsCreate}/>
      <Resource name="complains-suggestions" list={ComplainsSuggestionsList} show={ShowGuesser} edit={ComplainsSuggestionsEdit} create={ComplainsSuggestionsCreate}/>
      <Resource name="news" list={NewsList} show={ShowGuesser} edit={NewsEdit} create={NewsCreate} /> 
    </Admin>
  );

export default App;