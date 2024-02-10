import { Navigate, useRoutes, Outlet } from 'react-router-dom';

import {
    AboutPage,
    ComingSoonPage,
    ContactPage,
    DashBoardLayout,
    FaqsPage,
    MailUnsubscribePage,
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
    Calender,
    Files,

    // users
    UsersCreate,
    UsersDetails,
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
    TasksCreate,
    TasksDetails,
    TasksList,
    
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
            element: (
                <GuestGuard>
                    <Outlet />
                </GuestGuard>
            ),
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
                <AuthGuard>
                    <DashBoardLayout>
                        <Outlet />
                    </DashBoardLayout>
                </AuthGuard>
            ),
            children: [
                {
                    path:"users",
                    children:[

                        {
                            path: 'create',
                            element: <UsersCreate />,
                        },
                        {
                            path: 'list',
                            element: <UsersLists />,
                        },
                        {
                            path: 'details',
                            element: <UsersDetails />,
                        },
                        {
                            path: 'edit',
                            element: <UsersCreate />,
                        },
                    ]
                },
                {
                    path:"departments",
                    children:[

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
                    ]
                },
                {
                    path:"projects",
                    children:[

                        {
                            path: 'create',
                            element: <ProjectCreate />,
                        },
                        {
                            path: 'list',
                            element: <ProjectLists />,
                            index:true
                        },
                        {
                            path: 'details',
                            element: <ProjectDetails />,
                        },
                        {
                            path: 'edit',
                            element: <ProjectCreate />,
                        },
                    ]
                },
                {
                    path:"tasks",
                    children:[

                        {
                            path: 'create',
                            element: <TasksCreate />,
                        },
                        {
                            path: 'list',
                            element: <TasksList />,
                        },
                        {
                            path: 'details',
                            element: <TasksDetails />,
                        },
                        {
                            path: 'edit',
                            element: <TasksCreate />,
                        },
                    ]
                },
                {
                    path:"teams",
                    children:[
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
                    ]
                },
                {
                    path:"communication",
                    children:[

                        {
                            path: 'chat',
                            element: <UserChatting />,
                        },
                        {
                            path: 'meet',
                            element: <SingleVideoCall />,
                        },
                        {
                            path: 'calendar',
                            element: <Calender />,
                        },
                        {
                            path: 'files',
                            element: <Files />,
                        },
                    ]
                }
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
            path: '/faqs',
            element: <FaqsPage />,
        },
        {
            path: '/mail-unsubscribe',
            element: <MailUnsubscribePage />,
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
