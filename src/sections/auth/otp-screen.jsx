import { useState, useRef, useEffect } from 'react';
import { Stack, TextField } from '@mui/material';

function OtpScreen() {
    const [txtvalue, setValue] = useState({
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
    });

    const [focus, setFocus] = useState('1');
    const inputRefs = {
        '1': useRef(null),
        '2': useRef(null),
        '3': useRef(null),
        '4': useRef(null),
        '5': useRef(null),
        '6': useRef(null),
    };

    useEffect(() => {
        if (focus && inputRefs[focus].current) {
            inputRefs[focus].current.focus();
        }
    }, [focus]);

    const handleTextChange = (event) => {
        const { name, value } = event.target;
        
        // update existing event to new box
        if(/^\d*$/.test(value) && txtvalue[name]!==''){
            if (name !== '6') {
                const changeNext = `${parseInt(name) + 1}`;
                setFocus(changeNext);
                setValue((prevTxtValue) => ({
                    ...prevTxtValue,
                    [changeNext]: value[value.length-1],
                }));
            }
            
        }
        
        // insert new event
        if(/^\d*$/.test(value) && value.length===1 && txtvalue[name]===''){
            setValue((prevTxtValue) => ({
                ...prevTxtValue,
                [name]: value,
            }));

            // Move focus to the next TextField
            if (name !== '6') {
                setFocus(`${parseInt(name) + 1}`);
            }
        }
    
    };
    
    const handleKeyDown = (event) => {
        const { name } = event.target;

        // Move focus to the previous TextField when backspacing
        if (event.key === 'Backspace' && name !== '1') {
            setFocus(`${parseInt(name) - 1}`);
            setValue((prevTxtValue) => ({
                ...prevTxtValue,
                [name]: '',
            }));
            
        }
        
        // for first box case
        if (event.key === 'Backspace' && name === '1') {
            setFocus(`${1}`);
            setValue((prevTxtValue) => ({
                ...prevTxtValue,
                [name]: '',
            }));

        }
    };

    return (
        <>
        <Stack direction='row' gap={1}>
            {['1', '2', '3', '4', '5', '6'].map((index) => (
                <TextField
                    key={index}
                    name={index}
                    disabled={focus !== index}
                    autoFocus={focus === index}
                    value={txtvalue[index]}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                    type='text'
//                    inputProps={{ maxLength: 1 }}
                    sx={{ width: 50, height: 40, borderRadius: '5px', textAlign: 'center' }}
                    inputRef={inputRefs[index]}
                />
                ))}
        </Stack>
        </>
        );
}

export default OtpScreen;
