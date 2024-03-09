import { Card, CardContent, CardHeader } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function TimeLine({ assignee = [] }) {
    const hh = [
        { time: '12-03-2023', stage: 'Stage 1' },
        { time: '12-03-2023', stage: 'Stage 2' },
        { time: '12-03-2023', stage: 'Stage 3' },
        { time: '12-03-2023', stage: 'Done' },
    ];
    return (
        <Card sx={{ borderRadius: '15px', boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px' }}>
            <CardHeader title={'Time Line'} />
            <CardContent>
                <Timeline position="alternate">
                    {hh.map((item) => (
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                {item.time}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>{item.stage}</TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </CardContent>
        </Card>
    );
}
