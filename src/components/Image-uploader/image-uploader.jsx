import React, { useState } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import uploadimag from 'src/assets/upload-img.png';

const ImagePreview = ({ OnClear, index, image }) => (
    <>
        <Box sx={{ position: 'relative' }}>
            <Box
                component="img"
                key={index}
                src={image}
                sx={{
                    width: 100,
                    height: 100,
                    flexShrink: 0,
                    borderRadius: '10px',
                    boxShadow: 1,
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
                    backgroundColor: 'black',
                    color: 'white',
                }}
            >
                <Iconify icon="ic:round-close" width={14} />
            </IconButton>
        </Box>
    </>
);

const ImageUploader = ({
    maxImages = 5,
    maxImageSize = 5 * 1024 * 1024,
    allowedTypes = ['image/jpeg', 'image/png'],
    srcImage = [],
    singleUpload = false,
}) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageUrl, setImageUrl] = useState(srcImage || '');
    const [totalImage, setTotalImages] = useState(maxImages);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        console.log(files);
        files.forEach((file) => {
            if (file.size > maxImageSize || !allowedTypes.includes(file.type) || totalImage == 0) {
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setTotalImages((prev) => prev - 1);
                setSelectedImages((prevImages) => [...prevImages, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const clearImages = (selectedIndex) => {
        setTotalImages((prev) => prev + 1);
        const filteredData = selectedImages.filter((item, index) => index !== selectedIndex);
        setSelectedImages([...filteredData]);
    };
    const clearUrlImages = (selectedIndex) => {
        setTotalImages((prev) => prev + 1);
        const filteredData = imageUrl.filter((item, index) => index !== selectedIndex);
        setImageUrl([...filteredData]);
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mb: 2,
                }}
            >
                <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                    <Box
                        sx={{
                            height: '180px',
                            borderRadius: '10px',
                            backgroundColor: '#f5f5f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Stack sx={{ alignItems: 'center' }}>
                            <Box
                                component="img"
                                src={uploadimag}
                                alt="Upload Image"
                                sx={{ width: 60, height: 60 }}
                            />
                            <Typography variant="subtitle1">Select file to upload</Typography>
                        </Stack>
                    </Box>
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept={allowedTypes.join(',')}
                    multiple
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
            </Box>

            <Stack gap={2} direction="row">
                {selectedImages.map((image, index) => (
                    <ImagePreview OnClear={clearImages} index={index} image={image} />
                ))}
                {imageUrl.map((image, index) => (
                    <ImagePreview OnClear={clearUrlImages} index={index} image={image} />
                ))}
            </Stack>
        </Box>
    );
};

export default ImageUploader;
