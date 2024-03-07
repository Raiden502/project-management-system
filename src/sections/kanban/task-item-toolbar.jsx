import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
// hooks
// components
import Iconify from 'src/components/iconify/Iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/utils/use-boolean';

// ----------------------------------------------------------------------

export default function TaskDetailsToolbar({
    taskName,
    onDelete,
    taskStatus,
    onCloseDetails,
    onSave,
}) {
    const confirm = useBoolean();
    const popover = usePopover();
    const [status, setStatus] = useState([taskStatus]);

    const handleChangeStatus = useCallback(
        (newValue) => {
            popover.onClose();
            setStatus(newValue);
        },
        [popover]
    );

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                sx={{
                    p: (theme) => theme.spacing(2.5, 1, 2.5, 2.5),
                }}
            >
                {/* <Button
                    size="small"
                    variant="soft"
                    endIcon={
                        <Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ ml: -0.5 }} />
                    }
                    onClick={popover.onOpen}
                >
                    {status}
                </Button> */}

                <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
                    <Tooltip title="Delete task">
                        <IconButton onClick={confirm.onTrue}>
                            <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                    </Tooltip>

                    <IconButton onClick={onSave}>
                        <Iconify icon="fluent:save-24-filled" />
                    </IconButton>
                </Stack>
            </Stack>

            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                arrow="top-right"
                sx={{ width: 140 }}
            >
                {status.map((option) => (
                    <MenuItem
                        key={option}
                        selected={status === option}
                        onClick={() => {
                            handleChangeStatus(option);
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </CustomPopover>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content={
                    <>
                        Are you sure want to delete <strong> {taskName} </strong>?
                    </>
                }
                action={
                    <Button variant="contained" color="error" onClick={onDelete}>
                        Delete
                    </Button>
                }
            />
        </>
    );
}
