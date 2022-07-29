import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Project from 'views/project/project';
import IntroManagement from 'views/main/intro';
import BlogManagement from 'views/main/blog';
import Register from 'views/user/register';
import PostManager from 'views/user/post';
import Transaction from 'views/transaction/transaction';
import ProjectProduct from 'views/project/product';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Apartment = Loadable(lazy(() => import("views/manager/apartment")))
const House = Loadable(lazy(() => import("views/manager/house")))
const Land = Loadable(lazy(() => import("views/manager/land")))
const BusinessPremises = Loadable(lazy(() => import("views/manager/businessPremises")))
const Motal = Loadable(lazy(() => import("views/manager/motal")))


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/manager/apartment',
            element: <Apartment />
        },
        {
            path: '/manager/house',
            element: <House />
        },
        {
            path: '/manager/land',
            element: <Land />
        },
        {
            path: '/manager/business-premises',
            element: <BusinessPremises />
        },
        {
            path: '/manager/motal',
            element: <Motal />
        },
        {
            path: '/project/list',
            element: <Project />
        },
        {
            path: '/project/product',
            element: <ProjectProduct />
        },
        {
            path: '/main/banner',
            element: <IntroManagement />
        },
        {
            path: '/main/blog',
            element: <BlogManagement />
        },
        {
            path: '/user/account',
            element: <Register />
        },
        {
            path: '/user/post',
            element: <PostManager />
        },
        {
            path: '/transaction',
            element: <Transaction />
        },
    ]
};

export default MainRoutes;
