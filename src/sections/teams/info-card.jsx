import { Card, Stack, TextField, Typography } from '@mui/material';
import ImageUploader from 'src/components/Image-uploader/image-uploader';

export default function TeamInfo() {
    return (
        <Card sx={{ position: 'relative' }}>
            <Stack gap={4} sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                    <Typography variant="body1">Name</Typography>
                    <TextField
                        name="projectname"
                        sx={{ height: '40px' }}
                        // value={}
                        // onChange={()=>{}}
                        placeholder="e.g., My Awesome Project"
                    />
                </Stack>
                <Stack spacing={1.5}>
                    <Typography variant="body1">Description</Typography>
                    <TextField
                        multiline
                        rows={6}
                        maxRows={10}
                        label="Description"
                        sx={{}}
                        // value={newUser.password}
                        // onChange={HandlePageDetails}
                        placeholder="description"
                    />
                </Stack>
                <Stack spacing={1.5}>
                    <Typography variant="body1">Images</Typography>
                    <ImageUploader />
                </Stack>
            </Stack>
        </Card>
    );
}
