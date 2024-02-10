function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS = {
    AUTH: '/auth',
    DASHBOARD: '/dashboard',
};

export const paths = {
    auth: {
        root: ROOTS.AUTH,
        login: path(ROOTS.AUTH, '/login'),
        register: path(ROOTS.AUTH, '/register'),
        verify: path(ROOTS.AUTH, '/verify'),
        resetPassword: path(ROOTS.AUTH, '/resetPassword'),
        newPassword: path(ROOTS.AUTH, '/newPassword'),
    },
    dashboard: {
        root: ROOTS.DASHBOARD,
        projects:{
            list: path(ROOTS.DASHBOARD, '/projects/list'),
            create: path(ROOTS.DASHBOARD, '/projects/create'),
            details: path(ROOTS.DASHBOARD, '/projects/details'),
            edit: path(ROOTS.DASHBOARD, '/projects/edit'),
        },
        teams:{
            list: path(ROOTS.DASHBOARD, '/teams/list'),
            create: path(ROOTS.DASHBOARD, '/teams/create'),
            details: path(ROOTS.DASHBOARD, '/teams/details'),
            edit: path(ROOTS.DASHBOARD, '/teams/edit'),
        },
        tasks:{
            list: path(ROOTS.DASHBOARD, '/tasks/list'),
            create: path(ROOTS.DASHBOARD, '/tasks/create'),
            details: path(ROOTS.DASHBOARD, '/tasks/details'),
            edit: path(ROOTS.DASHBOARD, '/tasks/edit'),
        },
        departments:{
            list: path(ROOTS.DASHBOARD, '/departments/list'),
            create: path(ROOTS.DASHBOARD, '/departments/create'),
            details: path(ROOTS.DASHBOARD, '/departments/details'),
            edit: path(ROOTS.DASHBOARD, '/departments/edit'),
        },
        users:{
            list: path(ROOTS.DASHBOARD, '/users/list'),
            create: path(ROOTS.DASHBOARD, '/users/create'),
            details: path(ROOTS.DASHBOARD, '/users/details'),
            edit: path(ROOTS.DASHBOARD, '/users/edit'),
        },
        communication: {
            chat: path(ROOTS.DASHBOARD, '/communication/chat'),
            meet: path(ROOTS.DASHBOARD, '/communication/meet'),
            calendar: path(ROOTS.DASHBOARD, '/communication/calendar'),
            files: path(ROOTS.DASHBOARD, '/communication/files'),
        },
    },
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    mailUnsubscribe: '/mail-unsubscribe',
    pricing: '/pricing',
    payment: '/payment',
    about: '/about-us',
    contact: '/contact-us',
    faqs: '/faqs',
    page403: '/403',
    page404: '/404',
    page500: '/500',
    docs: {
        root: 'https://example.com',
        changelog: 'https://docs.example.com/changelog',
    },
};
