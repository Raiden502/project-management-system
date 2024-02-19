import React, { useState } from 'react';
import { Box, IconButton, Stack, Typography, Input } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';

const AvatarUploader = ({
    allowedTypes = ['image/jpeg', 'image/png'],
    selectedImages,
    setSelectedImages,
}) => {
    const handleImageChange = (event) => {
        const files = event.target.files[0];
        if (files) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImages(reader.result);
            };
            reader.readAsDataURL(files);
        }
    };

    return (
        <Box
            htmlFor="image-upload"
            component="label"
            style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    height: '150px',
                    width: '150px',
                    borderRadius: '80px',
                    backgroundColor: '#f5f5f5',
                    border: selectedImages ? 'none' : '1px dashed black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {selectedImages ? (
                    <Box
                        component="img"
                        src={selectedImages}
                        sx={{ width: 'inherit', height: 'inherit', borderRadius: 'inherit' }}
                    ></Box>
                ) : (
                    <Stack sx={{ alignItems: 'center' }}>
                        <Iconify icon="solar:camera-add-bold-duotone" />
                        <Typography variant="body2">Upload photo</Typography>
                    </Stack>
                )}
            </Box>
            <Input
                id="image-upload"
                type="file"
                accept={allowedTypes.join(',')}
                multiple
                onChange={handleImageChange}
                sx={{ display: 'none' }}
            />
        </Box>
    );
};

export default AvatarUploader;
