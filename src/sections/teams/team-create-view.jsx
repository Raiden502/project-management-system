import { Card, Stack, TextField, Typography, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import TeamInfo from './info-card';
import TeamContributor from './contributor-card';

export default function TeamCreateView() {
    return (
        <Grid container spacing={3}>
            <Grid md={4}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                    Details
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Title, short description, image...
                </Typography>
            </Grid>
            <Grid xs={12} md={8}>
                <TeamInfo />
            </Grid>
            <Grid md={4}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                    Contributors
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Users and teams that contribute to the project
                </Typography>
            </Grid>
            <Grid xs={12} md={8}>
                <TeamContributor />
            </Grid>
            <Grid xs={12} lg={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" sx={{ bgcolor: '#212B36', borderRadius: '8px' }}>
                    Create
                </Button>
            </Grid>
        </Grid>
    );
}
