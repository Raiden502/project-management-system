import { Avatar, AvatarGroup, Box, Paper, Stack, Typography } from '@mui/material';
import { Draggable } from '@hello-pangea/dnd';
import Iconify from 'src/components/iconify/Iconify';
import Image from 'src/components/image';

export default function TaskItem({ item }) {
    const renderPriority = (
        <Iconify
            icon={
                (item.priority === 'low' && 'solar:double-alt-arrow-down-bold-duotone') ||
                (item.priority === 'medium' && 'solar:double-alt-arrow-right-bold-duotone') ||
                'solar:double-alt-arrow-up-bold-duotone'
            }
            sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                ...(item.priority === 'low' && {
                    color: 'info.main',
                }),
                ...(item.priority === 'medium' && {
                    color: 'warning.main',
                }),
                ...(item.priority === 'high' && {
                    color: 'error.main',
                }),
            }}
        />
    );
    const renderImg = (
        <Box
            sx={{
                p: (theme) => theme.spacing(1, 1, 0, 1),
            }}
        >
            <Image
                disabledEffect
                alt={item.attachments[0]}
                src={item.attachments[0]}
                ratio="4/3"
                sx={{
                    borderRadius: '14px',
                }}
            />
        </Box>
    );

    const renderInfo = (
        <Stack direction="row" alignItems="center">
            <Stack
                flexGrow={1}
                direction="row"
                alignItems="center"
                sx={{
                    typography: 'caption',
                    color: 'text.disabled',
                }}
            >
                <Iconify width={16} icon="solar:chat-round-dots-bold" sx={{ mr: 0.25 }} />
                <Box component="span" sx={{ mr: 1 }}>
                    {item.comments.length}
                </Box>

                <Iconify width={16} icon="eva:attach-2-fill" sx={{ mr: 0.25 }} />
                <Box component="span">{item.attachments.length}</Box>
            </Stack>
            {item.users && (
                <AvatarGroup total={4}>
                    {item.users.map((user) => (
                        <Avatar
                            alt="Remy Sharp"
                            src={user.avatar}
                            sx={{
                                width: 16,
                                height: 16,
                            }}
                        />
                    ))}
                </AvatarGroup>
            )}
        </Stack>
    );
    return (
        <Draggable draggableId={item.id} index={item.id}>
            {(provided) => (
                <Paper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    // onClick={details.onTrue}
                    sx={{
                        width: 1,
                        borderRadius: '16px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow:
                            'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
                        '&:hover': {
                            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        },
                    }}
                >
                    {!!item.attachments.length && renderImg}
                    <Stack spacing={2} sx={{ px: 2, py: 1.5, position: 'relative' }}>
                        {renderPriority}

                        <Typography
                            variant="subtitle2"
                            sx={{
                                textTransform: 'capitalize',
                                color: '#212B36',
                            }}
                        >
                            {item.content}
                        </Typography>
                        {renderInfo}
                    </Stack>
                </Paper>
            )}
        </Draggable>
    );
}
