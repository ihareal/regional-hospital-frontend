import { Layout } from 'react-admin';
import { CustomMenu } from '../menu/menu';

export const CustomLayout = (props) => <Layout {...props} menu={CustomMenu} />;