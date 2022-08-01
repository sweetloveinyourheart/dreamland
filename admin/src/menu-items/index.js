import dashboard from './dashboard';
import main from './main';
import pages from './pages';
import transaction from './transaction';
import user, { productManager } from './user'
import project from './project'

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, pages, project ,main, user, transaction]
};

export const productManagerItems = {
    items: [dashboard, pages, project, productManager]
}

export const transactionItems = {
    items: [dashboard, transaction]
};

export default menuItems;
