import { Box, InputAdornment, Stack, TextField } from '@mui/material';
import ProjItem from './project-list-item';
import Iconify from 'src/components/iconify/Iconify';

const projects = [
    {
        id: 1,
        name: 'EcoSmart Home Automation',
        desc: 'Develop an eco-friendly smart home automation system that optimizes energy usage and enhances user comfort.',
        icon: 'https://api-prod-minimal-v510.vercel.app/assets/images/company/company_5.png',
        candidates: '12',
        teamsize: '8',
        tasks: '20',
        date: '2024-01-01',
        status: 'On-going',
    },
    {
        id: 2,
        name: 'HealthCare Connect',
        desc: 'Build a comprehensive healthcare platform that connects patients, doctors, and medical facilities for efficient healthcare management.',
        icon: 'https://api-prod-minimal-v510.vercel.app/assets/images/company/company_4.png',
        candidates: '15',
        teamsize: '10',
        tasks: '15',
        date: '2024-02-15',
        status: 'paused',
    },
    {
        id: 3,
        name: 'FinTech Innovators',
        desc: 'Create a cutting-edge financial technology solution to revolutionize online banking and financial transactions.',
        icon: 'https://api-prod-minimal-v510.vercel.app/assets/images/company/company_3.png',
        candidates: '10',
        teamsize: '6',
        tasks: '25',
        date: '2024-03-10',
        status: 'paused',
    },
    {
        id: 4,
        name: 'SmartCity Infrastructure',
        desc: 'Design and implement a smart city infrastructure project focused on improving urban living through advanced technologies.',
        icon: 'https://api-prod-minimal-v510.vercel.app/assets/images/company/company_1.png',
        candidates: '8',
        teamsize: '12',
        tasks: '18',
        date: '2024-04-05',
        status: 'On-going',
    },
    {
        id: 5,
        name: 'AI-driven Customer Support',
        desc: 'Develop an AI-powered customer support system to enhance customer service efficiency and satisfaction.',
        icon: 'https://api-prod-minimal-v510.vercel.app/assets/images/company/company_6.png',
        candidates: '14',
        teamsize: '9',
        tasks: '22',
        date: '2024-05-20',
        status: 'paused',
    },
    {
        id: 6,
        name: 'GreenEnergy Solutions',
        desc: 'Create innovative green energy solutions to promote sustainability and reduce the carbon footprint.',
        icon: 'https://api-prod-minimal-v510.vercel.app/assets/images/company/company_5.png',
        candidates: '11',
        teamsize: '7',
        tasks: '16',
        date: '2024-06-15',
        status: 'paused',
    },
    {
        id: 7,
        name: 'SmartRetail Analytics',
        desc: 'Implement smart retail analytics to optimize store layouts, inventory management, and enhance customer shopping experiences.',
        icon: 'https://api-prod-minimal-v510.vercel.app/assets/images/company/company_4.png',
        candidates: '9',
        teamsize: '11',
        tasks: '19',
        date: '2024-07-01',
        status: 'On-going',
    },
    {
        id: 8,
        name: 'Education Technology Platform',
        desc: 'Build an advanced education technology platform to facilitate online learning, collaboration, and personalized learning experiences.',
        icon: 'https://api-prod-minimal-v510.vercel.app/assets/images/company/company_3.png',
        candidates: '13',
        teamsize: '8',
        tasks: '24',
        date: '2024-08-10',
        status: 'paused',
    },
    {
        id: 9,
        name: 'Urban Mobility Solutions',
        desc: 'Develop innovative solutions for urban mobility, including smart transportation systems and traffic management.',
        icon: 'https://api-prod-minimal-v510.vercel.app/assets/images/company/company_2.png',
        candidates: '10',
        teamsize: '10',
        tasks: '21',
        date: '2024-09-05',
        status: 'paused',
    },
];

function ProjectListView() {
    return (
        <Stack gap={4}>
            <TextField
                name="projectname"
                InputProps={{
                    sx: { borderRadius: '8px' },
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify
                                icon="ic:round-search"
                            />
                        </InputAdornment>
                    ),
                }}
                sx={{ height: '40px', width: '300px' }}
                // value={}
                // onChange={()=>{}}
                placeholder="search"
            />
            <Box
                gap={3}
                display="grid"
                gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                }}
            >
                {projects.map((details) => (
                    <ProjItem key={details.id} job={details} />
                ))}
            </Box>
        </Stack>
    );
}

export default ProjectListView;
