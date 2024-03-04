import React from 'react';
import { Box } from '@mui/material';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import { createPortal } from 'react-dom';
import 'react-resizable/css/styles.css'; // Import the styles for resizable

// Assuming VideoCallView is imported from a separate file
import VideoCallView from 'src/sections/video/VideoCallView';

const DraggableResizableBox = ({ children, ...props }) => (
    <Draggable {...props}>
        <Resizable maxWidth={1000} maxHeight={1000} minWidth={400} minHeight={300}>
            <Box
                sx={{
                    position: 'fixed',
                    display: 'flex',
                    flexDirection: 'column',
                    top: 50,
                    left: 50,
                    zIndex: 9999,
                    overflow: 'hidden',
                }}
            >
                {children}
            </Box>
        </Resizable>
    </Draggable>
);

function RenderVideoCallComponent({ isOpen, onClose }) {
    if (!isOpen) return <></>;

    return createPortal(
        <DraggableResizableBox>
            <VideoCallView />
        </DraggableResizableBox>,
        document.body
    );
}

export default RenderVideoCallComponent;
