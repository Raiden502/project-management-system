import {useContext} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import SearchBar from "./Search";
import ThemeChanger from "./Theme.jsx";
import {ThemesContext} from "src/providers/themes/ThemeProvider.jsx";

export default function Header() {
	const {theme}  = useContext(ThemesContext)
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" 
			sx={{
				// backgroundColor:theme.dark1
				}} >
				<Toolbar>
					<SearchBar />
					<ThemeChanger />
				</Toolbar>
			</AppBar>
		</Box>
	);
}
