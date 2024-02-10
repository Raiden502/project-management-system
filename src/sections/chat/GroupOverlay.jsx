import React from 'react';
import { AvatarGroup, Avatar } from '@mui/material';

const OverlayAvatar = ({ src, alt }) => {
    return (
        <AvatarGroup max={4} spacing={30}>
            <Avatar alt="Remy Sharp" src={src} />
            <Avatar alt="Travis Howard" src={''} />
        </AvatarGroup>
    );
};

export default OverlayAvatar;
