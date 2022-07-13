// assets
import { IconBuildingBank } from '@tabler/icons';

const transaction = {
    id: 'transaction',
    title: 'Giao dịch',
    caption: 'Giao dịch bất động sản',
    type: 'group',
    children: [
        {
            id: 'transaction-list',
            title: 'Giao dịch',
            type: 'item',
            url: '/transaction',
            icon: IconBuildingBank,
            breadcrumbs: false
        }
    ]
};

export default transaction;
