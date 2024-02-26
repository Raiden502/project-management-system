import {
    Box,
    Button,
    Card,
    IconButton,
    ListItemText,
    Stack,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import FullDetailsView from './full-details-view';
import CandidateDetails from './candidate-details';
import { useNavigate } from 'react-router-dom';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const tempData = {
    title: 'CSI Department',
    description:
        'In any organisation there are number of tasks which are not needed to be executed in real time like data sync, report generation, reconciliation of payments etc. These tasks can be executed in background in scheduled manner and this dramatically increases the overall performance of the system by segregating the time consuming and resource intensive processes. But these background tasks are prone to failure and thus some retrying mechanisms are needed for such jobs. Usually there are number of micro-services in a system and many of them will need these type of background jobs at some point or the other. But building this mechanism in all the services will lead to lot of boiler plate code in the services and will also require a lot of development and maintenance effort. So the need arises to build a centralised system which can handle scheduling such type of jobs in generic manner. Some of the common requirements that should be taken into consideration while building such system are:',
    department: 'MCA DEPARTMENT',
    organization: 'GVP COLLEGE',
    datePosted: '12-09-67',
    contacts: [
        {
            name: 'name',
            avatarUrl:
                'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            role: 'engineer',
        },
        {
            name: 'name1',
            avatarUrl:
                'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            role: 'engineer',
        },
        {
            name: 'name2',
            avatarUrl:
                'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            role: 'engineer',
        },
        {
            name: 'name3',
            avatarUrl:
                'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            role: 'engineer',
        },
        {
            name: 'name4',
            avatarUrl:
                'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            role: 'engineer',
        },
        {
            name: 'name5',
            avatarUrl:
                'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            role: 'engineer',
        },
        {
            name: 'name6',
            avatarUrl:
                'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            role: 'engineer',
        },
        {
            name: 'name7',
            avatarUrl:
                'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            role: 'engineer',
        },
    ],
};

export default function TeamDetailsView() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const [teams, setTeams] = useState({ ...tempData });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getBack = () => {
        navigate('/dashboard/teams/list');
    };

    const editTeams = () => {
        navigate('/dashboard/teams/create', {
            state: { teamId: location.state.teamId },
        });
    };
    return (
        <>
            <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    sx={{
                        textAlign: 'right',
                    }}
                    startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
                    onClick={getBack}
                >
                    <Typography variant="body2">Back</Typography>
                </Button>
                <Stack direction="row" gap={3}>
                    <IconButton onClick={editTeams}>
                        <Iconify icon="solar:pen-bold" />
                    </IconButton>
                    <Button
                        variant="contained"
                        endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                    >
                        <Typography variant="body2">Publish</Typography>
                    </Button>
                </Stack>
            </Stack>
            <Box sx={{ mt: 3 }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab
                        label={<Typography variant="subtitle2">Content</Typography>}
                        key={0}
                    />
                    <Tab label={<Typography variant="subtitle2">Candidates</Typography>} key={1} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <FullDetailsView teams={teams} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CandidateDetails candidates={teams.contacts} />
            </CustomTabPanel>
        </>
    );
}
