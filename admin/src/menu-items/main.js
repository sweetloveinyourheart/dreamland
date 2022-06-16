// assets
import { IconFileInfo, IconNews } from '@tabler/icons';


const main = {
    id: 'main',
    title: 'Thông tin',
    caption: 'Thông tin doanh nghiệp',
    type: 'group',
    children: [
        {
            id: 'banner',
            title: 'Banner giới thiệu',
            type: 'item',
            url: '/main/banner',
            icon: IconFileInfo,
            breadcrumbs: false
        },
        {
            id: 'blog',
            title: 'Tin tức',
            type: 'item',
            url: '/main/blog',
            icon: IconNews,
            breadcrumbs: false
        },
    ]
};

export default main;
