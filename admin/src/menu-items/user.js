// assets
import { IconUserPlus, IconBookmarks } from '@tabler/icons';


const user = {
    id: 'user',
    title: 'Người dùng',
    caption: 'Quản lý người dùng',
    type: 'group',
    children: [
        {
            id: 'register',
            title: 'Tài khoản',
            type: 'item',
            url: '/user/account',
            icon: IconUserPlus,
            breadcrumbs: false
        },
        {
            id: 'post',
            title: 'Bài đăng',
            type: 'item',
            url: '/user/post',
            icon: IconBookmarks,
            breadcrumbs: false
        }
    ]
};

export default user;
