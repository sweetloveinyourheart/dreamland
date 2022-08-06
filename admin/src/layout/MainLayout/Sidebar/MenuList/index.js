// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem, { transactionItems, productManagerItems } from 'menu-items';
import { useAuth } from 'contexts/auth';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const { user } = useAuth()
    
    const navItems = () => {

        if (user?.roles.includes("Admin"))
            return menuItem.items.map((item) => {
                switch (item.type) {
                    case 'group':
                        return <NavGroup key={item.id} item={item} />;
                    default:
                        return (
                            <Typography key={item.id} variant="h6" color="error" align="center">
                                Menu Items Error
                            </Typography>
                        );
                }
            });

        if (user?.roles.includes("ProductManager"))
            return productManagerItems.items.map((item) => {
                switch (item.type) {
                    case 'group':
                        return <NavGroup key={item.id} item={item} />;
                    default:
                        return (
                            <Typography key={item.id} variant="h6" color="error" align="center">
                                Menu Items Error
                            </Typography>
                        );
                }
            });

        if (user?.roles.includes("TransactionManager"))
            return transactionItems.items.map((item) => {
                switch (item.type) {
                    case 'group':
                        return <NavGroup key={item.id} item={item} />;
                    default:
                        return (
                            <Typography key={item.id} variant="h6" color="error" align="center">
                                Menu Items Error
                            </Typography>
                        );
                }
            });

        return menuItem.items.map((item) => {
            switch (item.type) {
                case 'group':
                    return <NavGroup key={item.id} item={item} />;
                default:
                    return (
                        <Typography key={item.id} variant="h6" color="error" align="center">
                            Menu Items Error
                        </Typography>
                    );
            }
        });
    }

    return <>{navItems()}</>;
};

export default MenuList;
