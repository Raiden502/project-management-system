import {
	createContext,
	useEffect,
	useReducer,
	useCallback,
	useMemo,
} from "react";

import PropTypes from "prop-types";
import colorUtils from "../../components/color-utils/utils";


const INTIAL = "INTIAL";
const CHANGE = "CHANGE";

const IntialReducerState = {
	CurrentColor: null,
};

const Reducer = (state, action) => {
	if (action.type === INTIAL) {
		const data =colorUtils.yellow
		localStorage.setItem('themes', 'yellow')
		return {
			CurrentColor: data,
		};
	}
	if (action.type === CHANGE) {
		const data = colorUtils[action.payload.color]
		localStorage.setItem('themes', action.payload.color)
		return {
			CurrentColor: data,
		};
	}
	return state;
};

export const ThemesContext = createContext(null);

ThemeProvider.propTypes = {
	children: PropTypes.node,
};

export function ThemeProvider({ children }) {
	const [state, Dispatch] = useReducer(Reducer, IntialReducerState);

	const changeTheme = (color) => {
		Dispatch({
			type: CHANGE,
			payload: {
				color: color,
			},
		});
	};

	const Intialize = ()=>{
		const theme = window.localStorage.getItem('themes')
		console.log("theme", theme)
		if (theme && theme!==undefined) {
			console.log("themess", theme)
			Dispatch({
				type: CHANGE,
				payload: {
					color: theme,
				},
			});
		}
		else{
			Dispatch({
				type: INTIAL,
			});
		}
	}

	const memoizedValue = useMemo(
		() => ({
			changeTheme,
			theme: state.CurrentColor,
			colorPicker: { yellow: "yellow", purple: "purple" },
		}),
		[state.CurrentColor],
	);

	useEffect(() => {
		Intialize()
	}, []);

	return (
		<ThemesContext.Provider value={memoizedValue}>
			{children}
		</ThemesContext.Provider>
	);
}
