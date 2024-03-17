import React, { useState } from 'react';
import { Box, IconButton, Input, Stack, Tooltip, alpha } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';

const ImagePreview = ({ OnClear, index, image, width, height }) => (
    <>
        <Box sx={{ position: 'relative' }}>
            <Box
                component="img"
                key={index}
                src={image}
                sx={{
                    width,
                    height,
                    flexShrink: 0,
                    borderRadius: '10px',
                    boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px',
                }}
            />
            <IconButton
                onClick={() => {
                    OnClear(index);
                }}
                sx={{
                    top: 6,
                    right: 6,
                    position: 'absolute',
                    backgroundColor: '#212B36',
                    opacity: 0.8,
                    color: 'white',
                    width: Number(width / 4.5),
                    height: Number(width / 4.5),
                    p: 0.3,
                }}
            >
                <Iconify icon="ic:round-close" />
            </IconButton>
        </Box>
    </>
);

const ImageUploader = ({
    maxImageSize = 5 * 1024 * 1024,
    allowedTypes = ['image/jpeg', 'image/png'],
    width = 60,
    height = 60,
    selectedImages,
    setSelectedImages,
}) => {
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        files.forEach((file) => {
            if (file.size > maxImageSize || !allowedTypes.includes(file.type)) {
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImages((prevImages) => [...prevImages,{id:"", file:reader.result}]);
            };
            reader.readAsDataURL(file);
        });
    };

    const clearImages = (selectedIndex) => {
        const filteredData = selectedImages.filter((item, index) => index !== selectedIndex);
        setSelectedImages([...filteredData]);
    };

    return (
        <Box
            htmlFor="image-upload"
            component="label"
            style={{
                cursor: 'pointer',
            }}
        >
            <Box
                gap={2}
                display="grid"
                gridTemplateColumns={{
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)',
                }}
            >
                {selectedImages.map((image, index) => (
                    <ImagePreview
                        OnClear={clearImages}
                        index={index}
                        image={image.file}
                        width={width}
                        height={height}
                    />
                ))}
                <Tooltip title="Add Attachments">
                    <Box
                        sx={{
                            width,
                            height,
                            borderRadius: '10px',
                            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
                            border: (theme) => `dashed 1px ${theme.palette.divider}`,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Iconify icon="mingcute:add-line" />
                    </Box>
                </Tooltip>
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

export default ImageUploader;
