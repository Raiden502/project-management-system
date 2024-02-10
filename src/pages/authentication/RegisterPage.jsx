import {Box, Stack, TextField} from "@mui/material";
import {useCallback, useContext, useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {AuthContext} from "src/auth/JwtContext.jsx";

function RegisterPage(){
    const {register} = useContext(AuthContext)

    const [newUser, setUserDetails] = useState(
        {username:"", password:"", firstname:"", lastname:""})

    const HandlePageDetails = useCallback((event)=>{
        const {name, value} = event.target
        setUserDetails((prevState)=>({
            ...prevState,
            [name]:value
        }))
    },[newUser])

    const SubmitDetails = async()=>{
        try {
            await register(newUser.username, newUser.password, newUser.firstname, newUser.lastname)
        } catch (error) {
            console.error("Registered failed", error);
        }
    }

    return (<>
    <Stack gap={2} sx={{width:350, borderRadius:5, border:'1px solid grey', padding:2}}>
        <Stack gap={2} sx={{}}>
            <TextField name="firstname" value = {newUser.firstname} onChange={HandlePageDetails} placeholder="Firstname"></TextField>
            <TextField name="lastname" value = {newUser.lastname} onChange={HandlePageDetails} placeholder="Lastname"></TextField>
            <TextField name="username" value = {newUser.username} onChange={HandlePageDetails} placeholder="Username/Email"></TextField>
            <TextField name="password" value = {newUser.password} onChange={HandlePageDetails} placeholder="Password"></TextField>
            <Button variant="contained" onClick={SubmitDetails}>Register</Button>
        </Stack>
    </Stack>
    </>)
}
export  default  RegisterPage