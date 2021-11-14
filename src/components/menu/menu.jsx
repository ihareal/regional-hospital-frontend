import * as React from 'react';
import { DashboardMenuItem, Menu, MenuItemLink } from 'react-admin';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PaymentIcon from '@mui/icons-material/Payment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import NoteIcon from '@mui/icons-material/Note';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ExposureIcon from '@mui/icons-material/Exposure';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import GroupWorkIcon from '@mui/icons-material/GroupWork';

export const CustomMenu = (props) => (
    <Menu {...props}>
        <MenuItemLink to="/patients" primaryText="Patients" leftIcon={ <GroupAddIcon/> } />
        <MenuItemLink to="/brigade-medical-personnel" primaryText="Medical personnel for brigade" leftIcon={ <ManageAccountsIcon/> } />
        <MenuItemLink to="/brigade" primaryText="Brigade info" leftIcon={ <ElectricCarIcon/> } />
        <MenuItemLink to="/register-of-cards" primaryText="Cards registration" leftIcon={ <PaymentIcon/> } />
        <MenuItemLink to="/arrivals" primaryText="Arrivals info" leftIcon={ <NightsStayIcon/> } />
        <MenuItemLink to="/cards" primaryText="Cards information" leftIcon={ <NoteIcon/> } />
        <MenuItemLink to="/catalogue-of-services" primaryText="Catalogue of services" leftIcon={ <ElectricalServicesIcon/> } />
        <MenuItemLink to="/complex-of-services" primaryText="Complex of services" leftIcon={ <AllInboxIcon/> } />
        <MenuItemLink to="/medical-personnel" primaryText="Medical personnel" leftIcon={ <MedicalServicesIcon/> } />
        <MenuItemLink to="/departments" primaryText="Departments" leftIcon={ <GroupWorkIcon/> } />
        <MenuItemLink to="/complains-suggestions" primaryText="Complains suggestions" leftIcon={ <ExposureIcon/> } />
        <MenuItemLink to="/news" primaryText="News" leftIcon={ <AnnouncementIcon/> } />
    </Menu>
    )

{/* 
<Resource name="medical-personnel" list={MedicalPersonnelList} show={ShowGuesser} edit={MedicalPersonnelEdit} create={MedicalPersonnelCreate}/>
<Resource name="departments" list={DepartmentsList} show={ShowGuesser} edit={DepartmentsEdit} create={DepartmentsCreate}/>
<Resource name="complains-suggestions" list={ComplainsSuggestionsList} show={ShowGuesser} edit={ComplainsSuggestionsEdit} create={ComplainsSuggestionsCreate}/>
<Resource name="news" list={NewsList} show={ShowGuesser} edit={NewsEdit} create={NewsCreate} />  */}
