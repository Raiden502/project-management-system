import { Backdrop, Tab, Tabs, Typography, alpha } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Label from 'src/components/label/label';
import { LoadingScreen } from 'src/components/loading-screen';
import { useSelector } from 'src/redux/store';
import { useBoolean } from 'src/utils/use-boolean';
import UserListView from './user-list-view';
import axiosInstance from 'src/utils/axios';

const STATUS_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'verified', label: 'Verified' },
    { value: 'un-verified', label: 'Un Verified' },
    { value: 'un-assign', label: 'Un Assigned' },
];

export default function UserTabsView() {
    const [userList, setUserList] = useState([]);
    const [status, setStatus] = useState({ status: 'all', data: [] });
    const department = useSelector((state) => state.department);
    const loading = useBoolean();

    const handleChange = (event, newValue) => {
        const value = newValue;
        console.log(value);
        switch (value) {
            case 'all': {
                setStatus((prev) => ({ status: 'all', data: userList }));
                return;
            }
            case 'verified': {
                setStatus((prev) => ({
                    status: 'verified',
                    data: userList.filter((item) => item.verified === true),
                }));
                return;
            }

            case 'un-verified': {
                setStatus((prev) => ({
                    status: 'un-verified',
                    data: userList.filter((item) => item.verified === false),
                }));
                return;
            }
            case 'un-assign': {
                setStatus((prev) => ({
                    status: 'un-assign',
                    data: userList.filter((item) => item.unassign === true),
                }));
                return;
            }
            default: {
                console.log('undefined');
            }
        }
    };

    const fetchUsers = async () => {
        try {
            loading.onTrue();
            const response = await axiosInstance.post('user/user_list', {
                department_id: department.department_id,
            });
            const { data, errorcode, verified, message } = response.data;
            if (errorcode === 0) {
                setUserList(data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            loading.onFalse();
        }
    };

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current && department.department_id) {
            fetchUsers();
            firstRender.current = false;
        }
    }, [department.department_id, userList]);

    console.log(status);
    return (
        <>
            <Tabs
                value={status.status}
                onChange={handleChange}
                sx={{
                    px: 2.5,
                    boxShadow: (theme) =>
                        `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                }}
            >
                {STATUS_OPTIONS.map((tab) => (
                    <Tab
                        key={tab.value}
                        iconPosition="end"
                        value={tab.value}
                        label={tab.label}
                        icon={
                            <Label
                                variant={
                                    ((tab.value === 'all' || tab.value === status.status) &&
                                        'filled') ||
                                    'soft'
                                }
                                color={
                                    (tab.value === 'verified' && 'success') ||
                                    (tab.value === 'un-verified' && 'warning') ||
                                    (tab.value === 'un-assign' && 'error') ||
                                    'default'
                                }
                            >
                                <Typography variant="body2">
                                    {tab.value === 'all' && userList.length}
                                    {tab.value === 'verified' &&
                                        userList.filter((item) => item.verified === true).length}

                                    {tab.value === 'un-verified' &&
                                        userList.filter((item) => item.verified === false).length}
                                    {tab.value === 'un-assign' &&
                                        userList.filter((item) => item.unassign === true).length}
                                </Typography>
                            </Label>
                        }
                    />
                ))}
            </Tabs>
            <UserListView userList={status.data} />
            <Backdrop open={loading.value}>
                <LoadingScreen />
            </Backdrop>
        </>
    );
}
