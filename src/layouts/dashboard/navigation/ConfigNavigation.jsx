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
    calendar:icon('uil:calender'),
    disabled: icon('lets-icons:user-alt-duotone'),
    analytics:icon('majesticons:analytics-line'),
    task_analytics:icon('grommet-icons:analytics'),
    dep_analytics:icon('ion:analytics-sharp'),
    teams:icon('fluent:people-team-24-regular')
};

export function useNavData() {
    const data = useMemo(() => [
        {
            subheader: 'overview',
            items: [
                {
                    title: 'user analytics',
                    path: paths.dashboard.communication.chat ,
                    icon: ICONS.analytics,
                },
                { title: 'department analytics', path: paths.dashboard.communication.chat , icon: ICONS.dep_analytics },
                { title: 'Project analytics', path: paths.dashboard.communication.chat , icon: ICONS.dep_analytics },
                { title: 'Task analytics', path: paths.dashboard.communication.chat , icon: ICONS.task_analytics },
            ],
        },

        // MANAGEMENT
        // ----------------------------------------------------------------------
        {
            subheader: 'management',
            items: [
                // USER
                {
                    title: 'user',
                    path: paths.dashboard.users.list,
                    icon: ICONS.user,
                    children: [
                        { title: 'profile', path: paths.dashboard.users.details },
                        { title: 'list', path: paths.dashboard.users.list },
                        { title: 'create', path: paths.dashboard.users.create },
                        { title: 'account', path: paths.dashboard.users.create },
                    ],
                },
                
            ],
        },
        {
            subheader: 'projects',
            items: [
                // USER
                {
                    title: 'project',
                    path: paths.dashboard.projects.list,
                    icon: ICONS.project,
                    children: [
                        { title: 'cards', path: paths.dashboard.projects.list },
                        { title: 'details', path: paths.dashboard.projects.details },
                        { title: 'create', path: paths.dashboard.projects.create },
                    ],
                },
                {
                    title: 'tasks',
                    path: paths.dashboard.tasks.list,
                    icon: ICONS.task,
                    children: [
                        { title: 'list', path: paths.dashboard.tasks.list },
                        { title: 'details', path: paths.dashboard.tasks.details },
                        { title: 'create', path: paths.dashboard.tasks.create },
                    ],
                },
                {
                    title: 'teams',
                    path: paths.dashboard.teams.list,
                    icon: ICONS.teams,
                    children: [
                        { title: 'list', path: paths.dashboard.teams.list },
                        { title: 'details', path: paths.dashboard.teams.details },
                        { title: 'create', path: paths.dashboard.teams.create },
                    ],
                },
            ],
        },
        {
            subheader: 'Communication',
            items: [
                { title: 'Chats', path: paths.dashboard.communication.chat, icon: ICONS.chat },
                { title: 'files', path: paths.dashboard.communication.files , icon: ICONS.file },
                { title: 'calendar', path: paths.dashboard.communication.calendar , icon: ICONS.calendar },
            ],
        }
    ]);

    return data;
}
