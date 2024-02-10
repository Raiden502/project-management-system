import { Box } from "@mui/material";
import PropTypes from 'prop-types';

MainLayout.propTypes ={
    children:PropTypes.node,
    sx:PropTypes.object
} 

function MainLayout({children, sx, ...other }){
    return(
        <Box>
            {children}
        </Box>
    )
}

export default MainLayout;