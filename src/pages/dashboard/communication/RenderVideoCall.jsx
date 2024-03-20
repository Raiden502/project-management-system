import React, { useEffect, useMemo, useRef } from 'react';
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

// function RenderVideoCallComponent({ isOpen, onClose }) {
//     if (!isOpen) {
//         return <></>;
//     }

//     const containerRef = useRef(null);
//     const externalWindowRef = useRef(null);
//     containerRef.current = document.createElement('div');

//     useEffect(() => {
//         externalWindowRef.current = window.open('', '', 'width=600,height=400,left=200,top=200');
//         externalWindowRef.current.document.body.appendChild(containerRef.current);
//         return () => {
//             externalWindowRef.current.close();
//         };
//     }, []);


//     return createPortal(<VideoCallView />, containerRef.current);
// }

// export default RenderVideoCallComponent;
