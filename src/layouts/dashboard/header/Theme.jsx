import {useContext} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {ThemesContext} from "src/providers/themes/ThemeProvider.jsx";


function ThemeChanger(){
    const {changeTheme, colorPicker} = useContext(ThemesContext)
    
    const HandleColorTheme = (event)=>{
        const {name, value} = event.target
        changeTheme(colorPicker[value])
    }
    return (
        <>
        <FormControl>
            <InputLabel id="demo-simple-select-label">Themes</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
//                value={}
                label="Age"
                sx={{width:100}}
                onChange={HandleColorTheme}
                >
                <MenuItem value="yellow">yellow</MenuItem>
                <MenuItem value="purple">purple</MenuItem>
            </Select>
        </FormControl>
        </>
    )
}

export default ThemeChanger