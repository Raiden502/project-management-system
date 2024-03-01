import { useMemo } from 'react';
import { paths } from 'src/routes/path';
import Iconify from 'src/components/iconify/Iconify';

const icon = (name) => <Iconify icon={name} />;

const ICONS = {
    chat: icon('ph:chats-circle-duotone'),
    user: icon('ph:user-duotone'),
    file: icon('ph:files-duotone'),
    task: icon('fluent:task-list-ltr-24-filled'),
    project: icon('ph:kanban-duotone'),
    departments: icon('mingcute:building-2-line'),
    calendar: icon('uil:calender'),
    disabled: icon('lets-icons:user-alt-duotone'),
    analytics: icon('majesticons:analytics-line'),
    task_analytics: icon('grommet-icons:analytics'),
    dep_analytics: icon('ion:analytics-sharp'),
    teams: icon('fluent:people-team-24-regular'),
};

export function useNavData() {
    const data = useMemo(() => [
        {
            // subheader: 'overview',
            roles: ['admin', 'super_admin'],
            items: [
                {
                    title: 'Dashboard',
                    path: paths.dashboard.analytics.project,
                    icon: ICONS.task_analytics,
                    roles: ['admin', 'super_admin'],
                },
            ],
        },

        // MANAGEMENT
        // ----------------------------------------------------------------------
        {
            // subheader: 'management',
            roles: ['admin', 'user', 'super_admin'],
            items: [
                // USER
                {
                    title: 'user',
                    path: paths.dashboard.users.list,
                    icon: ICONS.user,
                    roles: ['admin', 'user', 'super_admin'],
                    children: [
                        // {
                        //     title: 'Performance',
                        //     path: paths.dashboard.analytics.user,
                        //     roles: ['admin', 'user', 'super_admin'],
                        // },
                        { title: 'list', path: paths.dashboard.users.list, roles: ['admin', 'user', 'super_admin'] },
                        { title: 'create', path: paths.dashboard.users.create, roles: ['admin', 'super_admin'] },
                    ],
                },
            ],
        },
        {
            // subheader: 'projects',
            roles: ['admin', 'user', 'super_admin'],
            items: [
                // USER
                {
                    title: 'Departments',
                    path: paths.dashboard.departments.list,
                    icon: ICONS.departments,
                    roles: ['admin', 'user', 'super_admin'],
                    children: [
                        { title: 'list', path: paths.dashboard.departments.list , roles: ['admin', 'user', 'super_admin'],},
                        { title: 'details', path: paths.dashboard.departments.details, roles: ['admin', 'user', 'super_admin'], },
                        { title: 'create', path: paths.dashboard.departments.create, roles: ['admin', 'super_admin'], },
                    ],
                },
                {
                    title: 'project',
                    path: paths.dashboard.projects.list,
                    icon: ICONS.project,
                    roles: ['admin', 'user', 'super_admin'],
                    children: [
                        { title: 'list', path: paths.dashboard.projects.list, roles: ['admin', 'user', 'super_admin'], },
                        { title: 'create', path: paths.dashboard.projects.create, roles: ['admin', 'super_admin'], },
                    ],
                },
                {
                    title: 'teams',
                    path: paths.dashboard.teams.list,
                    icon: ICONS.teams,
                    roles: ['admin', 'user', 'super_admin'],
                    children: [
                        { title: 'list', path: paths.dashboard.teams.list , roles: ['admin', 'user', 'super_admin'],},
                        { title: 'create', path: paths.dashboard.teams.create , roles: ['admin', 'super_admin'],},
                    ],
                },
                {
                    title: 'tasks',
                    roles: ['admin', 'user', 'super_admin'],
                    path: paths.dashboard.tasks.list,
                    icon: ICONS.task,
                },
            ],
        },
        {
            // subheader: 'Communication',
            roles: ['admin', 'user', 'super_admin'],
            items: [{ title: 'Chats', path: paths.dashboard.communication.chat, icon: ICONS.chat , roles: ['admin', 'user', 'super_admin'],}],
        },
    ]);

    return data;
}
