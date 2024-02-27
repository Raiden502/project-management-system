import { Navigate, useRoutes, Outlet } from 'react-router-dom';

import {
    AboutPage,
    ComingSoonPage,
    ContactPage,
    DashBoardLayout,
    MaintenancePage,
    Page403,
    Page404,
    Page500,
    LoginPage,
    RegisterPage,
    VerifyCode,

    // communication
    UserChatting,
    SingleVideoCall,

    // users
    UsersCreate,
    UsersLists,

    // teams
    TeamsCreate,
    TeamsDetails,
    TeamsLists,

    //department
    DepartmentCreate,
    DepartmentDetails,
    DepartmentList,

    // projects
    ProjectCreate,
    ProjectDetails,
    ProjectLists,

    // tasks
    TasksList,

    // analytics
    DepartmentAnalytics,
    ProjectAnalytics,
    UserAnalytics,
} from './elements.jsx';

import AuthGuard from '../auth/AuthGuard.jsx';
import GuestGuard from '../auth/GuestGuard.jsx';

function Router() {
    return useRoutes([
        {
            path: '/',
            element: <Navigate to="/auth/login" replace={true} />,
        },
        {
            path: '*',
            element: <Navigate to="/404" replace={true} />,
        },
        {
            path: '/auth',
            // element: (
            //     <GuestGuard>
            //         <Outlet />
            //     </GuestGuard>
            // ),
            children: [
                {
                    path: 'login',
                    element: <LoginPage />,
                },
                {
                    path: 'register',
                    element: <RegisterPage />,
                },
                {
                    path: 'verify',
                    element: <VerifyCode />,
                },
            ],
        },
        {
            path: '/dashboard',
            element: (
                // <AuthGuard>
                <DashBoardLayout>
                    <Outlet />
                </DashBoardLayout>
                // </AuthGuard>
            ),
            children: [
                {
                    path: 'analytics',
                    children: [
                        {
                            path: 'user',
                            element: <UserAnalytics />,
                        },
                        {
                            path: 'project',
                            element: <ProjectAnalytics />,
                        },
                    ],
                },
                {
                    path: 'users',
                    children: [
                        {
                            path: 'create',
                            element: <UsersCreate />,
                        },
                        {
                            path: 'list',
                            element: <UsersLists />,
                        },
                        {
                            path: 'edit',
                            element: <UsersCreate />,
                        },
                    ],
                },
                {
                    path: 'departments',
                    children: [
                        {
                            path: 'create',
                            element: <DepartmentCreate />,
                        },
                        {
                            path: 'list',
                            element: <DepartmentList />,
                        },
                        {
                            path: 'details',
                            element: <DepartmentDetails />,
                        },
                        {
                            path: 'edit',
                            element: <DepartmentCreate />,
                        },
                    ],
                },
                {
                    path: 'projects',
                    children: [
                        {
                            path: 'create',
                            element: <ProjectCreate />,
                        },
                        {
                            path: 'list',
                            element: <ProjectLists />,
                        },
                        {
                            path: 'details',
                            element: <ProjectDetails />,
                        },
                        {
                            path: 'edit',
                            element: <ProjectCreate />,
                        },
                    ],
                },
                {
                    path: 'tasks',
                    children: [
                        {
                            path: 'list',
                            element: <TasksList />,
                        },
                    ],
                },
                {
                    path: 'teams',
                    children: [
                        {
                            path: 'create',
                            element: <TeamsCreate />,
                        },
                        {
                            path: 'list',
                            element: <TeamsLists />,
                        },
                        {
                            path: 'details',
                            element: <TeamsDetails />,
                        },
                        {
                            path: 'edit',
                            element: <TeamsCreate />,
                        },
                    ],
                },
                {
                    path: 'communication',
                    children: [
                        {
                            path: 'chat',
                            element: <UserChatting />,
                        },
                        {
                            path: 'meet',
                            element: <SingleVideoCall />,
                        },
                    ],
                },
            ],
        },
        {
            path: '/about-us',
            element: <AboutPage />,
        },
        {
            path: '/coming-soon',
            element: <ComingSoonPage />,
        },
        {
            path: '/contact-us',
            element: <ContactPage />,
        },
        {
            path: '/maintenance',
            element: <MaintenancePage />,
        },
        {
            path: '/403',
            element: <Page403 />,
        },
        {
            path: '/404',
            element: <Page404 />,
        },
        {
            path: '/500',
            element: <Page500 />,
        },
    ]);
}

export default Router;
