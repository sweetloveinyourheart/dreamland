// assets
import { IconKey, IconBuilding, IconHome, IconSquare, IconBuildingCommunity } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconBuilding,
    IconHome,
    IconSquare,
    IconBuildingCommunity
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Quản lý',
    caption: 'Quản lý bất động sản',
    type: 'group',
    children: [
        {
            id: 'apartment',
            title: 'Căn hộ / Chung cư',
            type: 'item',
            url: '/manager/apartment',
            icon: icons.IconBuilding,
            breadcrumbs: false
        },
        {
            id: 'house',
            title: 'Nhà ở',
            type: 'item',
            url: '/manager/house',
            icon: icons.IconHome,
            breadcrumbs: false
        },
        {
            id: 'land',
            title: 'Đất đai',
            type: 'item',
            url: '/manager/land',
            icon: icons.IconSquare,
            breadcrumbs: false
        },
        {
            id: 'businessPremises',
            title: 'Văn phòng / Mặt bằng',
            type: 'item',
            url: '/manager/business-premises',
            icon: icons.IconBuildingCommunity,
            breadcrumbs: false
        },
        {
            id: 'motal',
            title: 'Nhà trọ',
            type: 'item',
            url: '/manager/motal',
            icon: icons.IconKey,
            breadcrumbs: false
        }
    ]
};

export default pages;
