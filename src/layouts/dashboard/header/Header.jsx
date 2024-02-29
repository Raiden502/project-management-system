import { useTheme } from '@emotion/react';
import { useContext, useEffect, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, Divider, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { AuthContext } from 'src/auth/JwtContext';
import axiosInstance from 'src/utils/axios';
import { setDepartment } from 'src/redux/slices/Departments';
import { useDispatch } from 'src/redux/store';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { paths } from 'src/routes/path';
import { useRouter } from 'src/routes/hook';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const { theme } = useTheme();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const popover = usePopover();
    const [dept, setDept] = useState([]);
    const [defaultDept, setDefaultDept] = useState('');
    const firstdeptRender = useRef(true);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.post('/dept/dept_filter', { org_id: user.org_id });
            const { data, errorcode, verified, message } = response.data;
            if (errorcode === 0) {
                setDept(data);
                if (data.length > 0) {
                    setDefaultDept(data[0].department_id);
                    dispatch(setDepartment(data[0]));
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChangeDept = (event) => {
        dispatch(setDepartment(dept.find((item) => item.department_id === event.target.value)));
        setDefaultDept(event.target.value);
        navigate(
            user.role === 'user' ? paths.dashboard.tasks.list : paths.dashboard.analytics.project
        );
    };

    useEffect(() => {
        if (firstdeptRender.current) {
            fetchUsers();
            firstdeptRender.current = false;
        }
    }, []);

    return (
        <Box sx={{ position: 'sticky', top: 0, zIndex: 2, mb: 2 }}>
            <AppBar
                position="static"
                sx={{ bgcolor: 'transparent', boxShadow: 'none', backdropFilter: 'blur(7px)' }}
            >
                <Toolbar>
                    <IconButton onClick={() => {}}>
                        <Iconify icon="ic:round-search" />
                    </IconButton>
                    <Stack
                        flexGrow={1}
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={{ xs: 0.5, sm: 3 }}
                    >
                        <TextField
                            select
                            fullWidth
                            label="Departments"
                            name="Departments"
                            value={defaultDept}
                            onChange={handleChangeDept}
                            sx={{ maxWidth: '200px' }}
                        >
                            {dept.map((item) => (
                                <MenuItem key={item.department_id} value={item.department_id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <IconButton onClick={popover.onOpen}>
                            <Avatar alt="Remy Sharp" src={user.avatar} />
                        </IconButton>
                    </Stack>
                    <CustomPopover
                        open={popover.open}
                        onClose={popover.onClose}
                        sx={{ width: 200, p: 0 }}
                    >
                        <Box sx={{ p: 2, pb: 1.5 }}>
                            <Typography variant="subtitle2" noWrap>
                                {user.user_name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                {user.role}
                            </Typography>

                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                {user.email_address}
                            </Typography>
                        </Box>

                        <Divider sx={{ borderStyle: 'dashed' }} />

                        <Stack sx={{ p: 1 }}>
                            <MenuItem
                                key="Home"
                                onClick={() => {
                                    popover.onClose();
                                    navigate(
                                        user.role === 'user'
                                            ? paths.dashboard.tasks.list
                                            : paths.dashboard.analytics.project
                                    );
                                }}
                            >
                                Home
                            </MenuItem>
                            <MenuItem
                                key="Profile"
                                onClick={() => {
                                    popover.onClose();
                                    navigate(paths.dashboard.users.list);
                                }}
                            >
                                Profile
                            </MenuItem>
                        </Stack>

                        <Divider sx={{ borderStyle: 'dashed' }} />

                        <MenuItem
                            onClick={() => {
                                localStorage.removeItem('accessToken');
                                navigate('/');
                            }}
                            sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
                        >
                            Logout
                        </MenuItem>
                    </CustomPopover>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
