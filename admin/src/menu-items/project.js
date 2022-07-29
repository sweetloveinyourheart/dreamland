import { IconBuildingSkyscraper, IconBoxMultiple } from '@tabler/icons';

const project = {
    id: 'project-manager',
    title: 'Dự án',
    caption: 'Quản lý dự án',
    type: 'group',
    children: [
        {
            id: 'project',
            title: 'Dự án',
            type: 'item',
            url: '/project/list',
            icon: IconBuildingSkyscraper,
            breadcrumbs: false
        },
        {
            id: 'project-item',
            title: 'Sản phẩm dự án',
            type: 'item',
            url: '/project/product',
            icon: IconBoxMultiple,
            breadcrumbs: false
        }
    ]
}

export default project