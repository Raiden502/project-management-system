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
            subheader: 'overview',
            roles: ['admin', 'user'],
            items: [
                {
                    title: 'Dashboard',
                    path: paths.dashboard.analytics.project,
                    icon: ICONS.task_analytics,
                    roles: ['admin', 'user'],
                },
            ],
        },

        // MANAGEMENT
        // ----------------------------------------------------------------------
        {
            subheader: 'management',
            roles: ['admin', 'user'],
            items: [
                // USER
                {
                    title: 'user',
                    path: paths.dashboard.users.list,
                    icon: ICONS.user,
                    roles: ['admin', 'user'],
                    children: [
                        {
                            title: 'Performance',
                            path: paths.dashboard.analytics.user,
                            roles: ['admin', 'user'],
                        },
                        { title: 'list', path: paths.dashboard.users.list, roles: ['admin', 'user'] },
                        { title: 'create', path: paths.dashboard.users.create, roles: ['admin', 'user'] },
                    ],
                },
            ],
        },
        {
            subheader: 'projects',
            roles: ['admin', 'user'],
            items: [
                // USER
                {
                    title: 'Departments',
                    path: paths.dashboard.departments.list,
                    icon: ICONS.project,
                    roles: ['admin', 'user'],
                    children: [
                        { title: 'list', path: paths.dashboard.departments.list , roles: ['admin', 'user'],},
                        { title: 'details', path: paths.dashboard.departments.details, roles: ['admin', 'user'], },
                        { title: 'create', path: paths.dashboard.departments.create, roles: ['admin', 'user'], },
                    ],
                },
                {
                    title: 'project',
                    path: paths.dashboard.projects.list,
                    icon: ICONS.project,
                    roles: ['admin', 'user'],
                    children: [
                        { title: 'list', path: paths.dashboard.projects.list, roles: ['admin', 'user'], },
                        { title: 'details', path: paths.dashboard.projects.details, roles: ['admin', 'user'], },
                        { title: 'create', path: paths.dashboard.projects.create, roles: ['admin', 'user'], },
                    ],
                },
                {
                    title: 'teams',
                    path: paths.dashboard.teams.list,
                    icon: ICONS.teams,
                    roles: ['admin', 'user'],
                    children: [
                        { title: 'list', path: paths.dashboard.teams.list , roles: ['admin', 'user'],},
                        { title: 'details', path: paths.dashboard.teams.details, roles: ['admin', 'user'], },
                        { title: 'create', path: paths.dashboard.teams.create , roles: ['admin', 'user'],},
                    ],
                },
                {
                    title: 'tasks',
                    roles: ['admin', 'user'],
                    path: paths.dashboard.tasks.list,
                    icon: ICONS.task,
                },
            ],
        },
        {
            subheader: 'Communication',
            roles: ['admin', 'user'],
            items: [{ title: 'Chats', path: paths.dashboard.communication.chat, icon: ICONS.chat , roles: ['admin', 'user'],}],
        },
    ]);

    return data;
}
