import PropTypes from 'prop-types';
import { useState, useCallback, useMemo } from 'react';
// @mui
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';

// ----------------------------------------------------------------------

export default function TaskAdd({onAddTask, onCloseAddTask }) {
    const [name, setName] = useState('');

    const defaultTask = useMemo(
        () => ({
            name: name.trim(),
            priority: 'low',
        }),
        [name]
    );

    const handleKeyUpAddTask = useCallback(
        (event) => {
            if (event.key === 'Enter') {
                if (name) {
                    onAddTask(defaultTask);
                }
            }
        },
        [defaultTask, name, onAddTask]
    );

    const handleClickAddTask = useCallback(() => {
        if (name) {
            onAddTask(defaultTask);
        } else {
            onCloseAddTask();
        }
    }, [defaultTask, name, onAddTask, onCloseAddTask]);

    const handleChangeName = useCallback((event) => {
        setName(event.target.value);
    }, []);

    return (
        <ClickAwayListener onClickAway={handleClickAddTask}>
            <Paper
                sx={{
                    borderRadius: 1.5,
                    boxShadow: (theme) => theme.customShadows.z1,
                }}
            >
                <InputBase
                    autoFocus
                    multiline
                    fullWidth
                    placeholder="Task name"
                    value={name}
                    onChange={handleChangeName}
                    onKeyUp={handleKeyUpAddTask}
                    sx={{
                        px: 2,
                        height: 56,
                        [`& .${inputBaseClasses.input}`]: {
                            typography: 'subtitle2',
                        },
                    }}
                />
            </Paper>
        </ClickAwayListener>
    );
}

TaskAdd.propTypes = {
    onAddTask: PropTypes.func,
    onCloseAddTask: PropTypes.func,
};
