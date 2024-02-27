import { useState, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { inputBaseClasses } from '@mui/material/InputBase';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Iconify from 'src/components/iconify/Iconify';
import { useBoolean } from 'src/utils/use-boolean';

// ----------------------------------------------------------------------

export default function ColumnAdd({ setColumns }) {
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
        name !== '' &&
            setColumns((prev) => [
                ...prev,
                {
                    id: `T${prev.length + 1}`,
                    index: prev.length + 1,
                    type: name,
                },
            ]);
        setName('')
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
                        placeholder="New section"
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
                    Add Section
                </Button>
            )}
        </Paper>
    );
}
