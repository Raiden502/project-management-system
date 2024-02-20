import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';
import TaskKanbanView from 'src/sections/kanban/task-overview';

function TasksLists() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Tasks</title>
            </Helmet>
            <Container maxWidth={false}>
                <CustomBreadcrumbs
                    heading="Tasks"
                    links={[
                        {
                            name: 'Dashboard',
                            href: paths.dashboard.root,
                        },
                        {
                            name: 'Tasks',
                            href: paths.dashboard.tasks.list,
                        },
                        {
                            name: 'List',
                            href: paths.dashboard.root,
                        },
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                <TaskKanbanView />
            </Container>
        </>
    );
}
export default TasksLists;
