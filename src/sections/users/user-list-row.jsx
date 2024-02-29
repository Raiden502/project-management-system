import {
    Avatar,
    IconButton,
    TableCell,
    TableRow,
    Typography,
    MenuItem,
    Button,
} from '@mui/material';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Label from 'src/components/label';
import { useBoolean } from 'src/utils/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify/Iconify';
import { useContext } from 'react';
import { AuthContext } from 'src/auth/JwtContext';

export default function UserListRow({ row, index }) {
    const popover = usePopover();
    const confirm = useBoolean();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { user_id, user_name, avatar, email_addrs, mobile_num, verified, role } = row;

    const editUser = (userId) => {
        navigate('/dashboard/users/create', {
            state: { userId },
        });
    };

    return (
        <>
            <TableRow key={user_id} hover>
                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt={user_name} src={avatar} sx={{ mr: 2 }} />
                    {user_name}
                </TableCell>
                <TableCell>{email_addrs}</TableCell>
                <TableCell>{mobile_num || '---'}</TableCell>
                <TableCell>{role === 'super_admin' ? 'SUPER ADMIN' : role.toUpperCase()}</TableCell>
                <TableCell>
                    <Label
                        variant="soft"
                        color={
                            (verified !== false && 'success') ||
                            (verified === false && 'error') ||
                            'default'
                        }
                    >
                        <Typography variant="body2" fontSize={12} fontWeight="bold">
                            {verified ? 'verified' : 'pending'}
                        </Typography>
                    </Label>
                </TableCell>
                <TableCell>
                    <IconButton onClick={popover.onOpen}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>
            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                arrow="right-top"
                sx={{ width: 180 }}
            >
                <MenuItem
                    disabled={user.role === 'user'}
                    onClick={() => {
                        popover.onClose();
                        editUser(user_id);
                    }}
                >
                    <Iconify icon="solar:pen-bold" />
                    Edit
                </MenuItem>
                <MenuItem
                    disabled={role === 'super_admin' || user.role === 'user'}
                    onClick={() => {
                        popover.onClose();
                        confirm.onTrue();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Delete
                </MenuItem>
            </CustomPopover>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content="Are you sure want to delete?"
                action={
                    <Button variant="contained" color="error" onClick={() => {}}>
                        Delete
                    </Button>
                }
            />
        </>
    );
}
