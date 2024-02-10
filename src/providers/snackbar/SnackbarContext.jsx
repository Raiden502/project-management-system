// package imports
import {
	createContext,
	useEffect,
	useReducer,
	useCallback,
	useMemo,
	useState,
	memo,
} from "react";
import PropTypes from "prop-types";
import { Stack, Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react"; // Import keyframes utility

// ... (other imports)

// Define the slide-in animation
const slideIn = keyframes`
	from {
		right: -400px;
	}
	to {
		right: 0;
	}
	`;

// Define the slide-out animation
const slideOut = keyframes`
	from {
		right: 0;
	}
	to {
		right: -400px;
	}
`;

SnackBarProvider.propTypes = {
	children: PropTypes.node, // Fix the typo here
};

const IntialReducerState = {
	notifications: [],
	max: 3,
	delay: 1000,
};

const Reducer = (state, action) => {
	if (action.type === "SET_NOTIFICATION") {
		return {
			notifications: [
				...state.notifications,
				{
					...action.payload.info,
					delay:
						action.payload.delay > 0 &&
						action.payload.delay !== undefined
							? action.payload.delay
							: state.delay,
				},
			],
			delay: state.delay + 1000,
		};
	}
	if (action.type === "POP_NOTIFICATION") {
		state.notifications.shift();
		return {
			notifications: state.notifications,
			delay: state.delay - 1000,
		};
	}
	if (action.type === "RESET") {
		return {
			notifications: IntialReducerState.notifications,
		};
	}
	return state;
};

export const SnackBarContext = createContext(null);

export const BarStyle = memo(({ severity, body, timeout, delay }) => {
	const [show, useShow] = useState(true);

	const severityProfile = {
		success: {
			backgroundColor: "green",
			icon: "",
		},
		warning: {
			backgroundColor: "orange",
			icon: "",
		},
		info: {
			backgroundColor: "blue",
			icon: "",
		},
		failed: {
			backgroundColor: "red",
			icon: "",
		},
	};

	const HanldeChange = ()=>{
		useShow(!show)
	}
	useEffect(() => {
		console.log("inner", delay);
		timeout(delay);
	}, []);


	return (
		<Box
			sx={{
				backgroundColor: severityProfile[severity].backgroundColor,
				marginBottom: 2,
				float: "right",
				width: 300,
				height: 30,
				position: "relative",
				color: "white",
				animation: `${show ? slideIn : slideOut} 0.5s ease-in-out`, // Apply the animation
				boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
				borderRadius: 3,
				padding: 2,
			}}
		>
			<Typography>{body}</Typography>
		</Box>
	);
});

BarStyle.propTypes = {
	severity: PropTypes.any,
	body: PropTypes.any,
	timeout: PropTypes.func,
	delay: PropTypes.number,
};

export function SnackBarProvider({ children }) {
	const [state, Dispatch] = useReducer(Reducer, IntialReducerState);

	const scheduleNotificationEvent = useCallback((event) => {
		const { severity, body, customDelay } = event;
		Dispatch({
			type: "SET_NOTIFICATION",
			payload: {
				info: {
					severity: severity,
					body: body,
					timeout: function (delay) {
						setTimeout(() => {
							popNotification();
						}, 4000 + delay);
					},
				},
				delay: customDelay,
			},
		});
	}, []);

	const popNotification = useCallback(() => {
		Dispatch({ type: "POP_NOTIFICATION" });
	}, []);

	const memoizedValue = useMemo(
		() => ({
			notifications: state.notifications,
			scheduleNotificationEvent: scheduleNotificationEvent,
			popNotification: popNotification,
			maxQueue: state.max,
		}),
		[
			state.notifications,
			scheduleNotificationEvent,
			popNotification,
			state.max,
		],
	);

	return (
		<>
			<SnackBarContext.Provider value={memoizedValue}>
				{children}
				<Stack
					sx={{
						position: "absolute",
						top: 0,
						zIndex: 999,
						right: 0,
						margin: 2,
					}}
				>
					{memoizedValue.notifications.map((eventVal, index) => (
						<BarStyle
							key={index}
							severity={eventVal.severity}
							body={eventVal.body}
							timeout={eventVal.timeout}
							delay={eventVal.delay}
						/>
					))}
				</Stack>
			</SnackBarContext.Provider>
		</>
	);
}
