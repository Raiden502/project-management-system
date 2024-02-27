import { useState, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { inputBaseClasses } from '@mui/material/InputBase';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Iconify from 'src/components/iconify/Iconify';
import { useBoolean } from 'src/utils/use-boolean';

// ----------------------------------------------------------------------

export default function RowAdd({ setTaskData, taskId, taskData }) {
    const [name, setName] = useState('');
    const addSection = useBoolean();

    const handleChangeColumnName = useCallback((event) => {
        setName(event.target.value);
    }, []);

    // const handleCreateColumn = useCallback(async () => {
    //     try {
    //         if (name) {
    //             onCreateColumn({ name });
    //             setName('');
    //         }
    //         addSection.onFalse();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [addSection, name]);

    const AddNewColumn = () => {
        if (name !== '') {
            const dummyData = {
                id: 'TT0',
                index: 0,
                priority: '',
                name: name,
                type: '',
                description: '',
                comments: [],
                labels: [],
                reporter: [],
                attachments: [],
                assigne: [],
            };

            if (taskData) {
                const currentTasks = [...taskData];
                const newIndex = taskData.length;
                dummyData.id = `TT${newIndex}`;
                dummyData.index = newIndex;
                currentTasks.push(dummyData);
                setTaskData((prev) => ({ ...prev, [taskId]: [...currentTasks] }));
            } else {
                setTaskData((prev) => ({ ...prev, [taskId]: [dummyData] }));
            }
        }
        setName('');
        addSection.onFalse();
    };

    const handleKeyUp = useCallback(
        (event) => {
            if (event.key === 'Enter') {
                AddNewColumn();
            }
        },
        [AddNewColumn]
    );

    return (
        <Paper sx={{ minWidth: 280, width: 280 }}>
            {addSection.value ? (
                <ClickAwayListener onClickAway={AddNewColumn}>
                    <TextField
                        autoFocus
                        fullWidth
                        placeholder="New Task"
                        value={name}
                        onChange={handleChangeColumnName}
                        onKeyUp={handleKeyUp}
                        sx={{
                            [`& .${inputBaseClasses.input}`]: {
                                typography: 'h6',
                            },
                        }}
                    />
                </ClickAwayListener>
            ) : (
                <Button
                    fullWidth
                    size="large"
                    color="inherit"
                    variant="outlined"
                    startIcon={<Iconify icon="mingcute:add-line" sx={{ mr: -0.5 }} />}
                    onClick={addSection.onTrue}
                >
                    create
                </Button>
            )}
        </Paper>
    );
}
