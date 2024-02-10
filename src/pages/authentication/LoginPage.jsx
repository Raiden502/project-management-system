import {Box, Stack, TextField} from "@mui/material";
import {useCallback, useContext, useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {AuthContext} from "src/auth/JwtContext.jsx";

function LoginPage(){
    const {login} = useContext(AuthContext)

    const [loginDetails, setLoginDetails] = useState({username:"", password:""})

    const HandlePageDetails = useCallback((event)=>{
        const {name, value} = event.target
        setLoginDetails((prevState)=>({
            ...prevState,
               [name]:value
        }))
    },[loginDetails])

    const SubmitDetails = async()=>{
        try {
            await login(loginDetails.username, loginDetails.password)
        } catch (error) {
            console.error("Login failed", error);
        }
    }

    return (<>
    <Stack gap={2} sx={{width:350, borderRadius:5, border:'1px solid grey', padding:2}}>
            <Stack gap={2} sx={{}}>
                <TextField name="username" value = {loginDetails.username} onChange={HandlePageDetails} placeholder="Username/Email"></TextField>
                <TextField name="password" value = {loginDetails.password} onChange={HandlePageDetails} placeholder="Password"></TextField>
                <Button variant="contained" onClick={SubmitDetails}>Submit</Button>
            </Stack>
            <Typography>new user?</Typography>
        </Stack>
    </>)
}
export  default  LoginPage