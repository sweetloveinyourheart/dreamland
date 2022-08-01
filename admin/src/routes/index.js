import { useRoutes } from 'react-router-dom';

// routes
import { MainRoutes, TransactionRoutes, ProductManagerRoutes } from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import config from 'config';
import { useAuth } from 'contexts/auth';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const { user } = useAuth()

    if (user?.roles.includes("Admin"))
        return useRoutes([MainRoutes, AuthenticationRoutes], config.basename);

    if (user?.roles.includes("ProductManager"))
        return useRoutes([ProductManagerRoutes, AuthenticationRoutes], config.basename);

    if (user?.roles.includes("TransactionManager"))
        return useRoutes([TransactionRoutes, AuthenticationRoutes], config.basename);

    return useRoutes([MainRoutes, AuthenticationRoutes], config.basename);
}
