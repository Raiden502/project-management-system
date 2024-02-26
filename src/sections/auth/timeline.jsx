import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

function MyTimeline({ currentStep }) {
    return (
        <Timeline position="right" >
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color={currentStep === 1 ? 'secondary' : 'grey'} />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Step 1</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color={currentStep === 2 ? 'success' : 'grey'} />
                </TimelineSeparator>
                <TimelineContent>Step 2</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color={currentStep === 2 ? 'success' : 'grey'} />
                </TimelineSeparator>
                <TimelineContent>Step 2</TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}

export default MyTimeline;
