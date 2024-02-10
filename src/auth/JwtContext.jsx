// package imports
import {
	createContext,
	useEffect,
	useReducer,
	useCallback,
	useMemo
} from "react";
import PropTypes from "prop-types";

// local imports
import localStorageAvailable from "src/utils/localstorage";
import axiosInstance from "src/utils/axios";

const IntialReducerState = {
	user: null,
	IsInitialized: true,
};

const Reducer = (state, action) => {
	if (action.type === "INTIAL") {
		return {
			user: action.payload.user,
			IsInitialized: false,
		};
	}
	if (action.type === "LOGIN") {
		return {
			...state,
			user: action.payload.user,
			IsInitialized: false,
		};
	}
	if (action.type === "LOGOUT") {
		return {
			...state,
			user: null,
			IsInitialized: false,
		};
	}
	if (action.type === "REGISTER") {
		return {
			...state,
			user: action.payload.user,
			IsInitialized: false,
		};
	}
	return state;
};

export const AuthContext = createContext(null);

AuthProvider.propTypes = {
    children: PropTypes.node, // Fix the typo here
};

export function AuthProvider({ children }) {
	const [state, Dispatch] = useReducer(Reducer, IntialReducerState);
	const storageAvaliable = localStorageAvailable();

	const login = useCallback(async (email, password) => {
		await axiosInstance
			.post("/api/userlogin", {
				user_mail:email,
				password,
			})
			.then((response) => {
				const { accessToken, user, status } = response.data;
				console.log("data", response.data)
				if (status===false) {
					Dispatch({
						type: "INTIAL",
						payload: {
							user: null,
						},
					});
				} else {
					localStorage.setItem("accessToken", JSON.stringify(accessToken));
					Dispatch({
						type: "LOGIN",
						payload: {
							user: user,
						},
					});
				}
			})
			.catch((error) => {
				console.error(error);
				Dispatch({
					type: "INTIAL",
					payload: {
						user: null,
					},
				});
			});
	}, []);

	const register = useCallback(
		async (email, password, firstName, lastName) => {
			await axiosInstance
				.post("/register", {
					email,
					password,
					firstName,
					lastName,
				})
				.then((response) => {
					const { accessToken, user, error_code } = response.data;

					if (error_code) {
						Dispatch({
							type: "INTIAL",
							payload: {
								user: null,
							},
						});
					} else {
						localStorage.setItem("accessToken", accessToken);
						Dispatch({
							type: "REGISTER",
							payload: {
								user: user,
							},
						});
					}
				})
				.catch((error) => {
					console.error(error);
					Dispatch({
						type: "INTIAL",
						payload: {
							user: null,
						},
					});
				});
		},
		[],
	);

	const logout = useCallback(async (email) => {
		await axiosInstance
			.post("/register", {
				email,
			})
			.then((response) => {
				const { error_code } = response.data;

				if (error_code) {
					Dispatch({
						type: "INTIAL",
						payload: {
							user: null,
						},
					});
				} else {
					Dispatch({
						type: "LOGOUT",
					});
				}
			})
			.catch((error) => {
				console.error(error);
				Dispatch({
					type: "INTIAL",
					payload: {
						user: null,
					},
				});
			});
	}, []);

	const initialize = useCallback(async () => {
		try {
			const accessToken = storageAvaliable
				? localStorage.getItem("accessToken")
				: "";
			console.log("token", accessToken)
			if (accessToken) {
				Dispatch({
					type: "INTIAL",
					payload: {
						user: JSON.parse(accessToken),
					},
				});
			} else {
				Dispatch({
					type: "INTIAL",
					payload: {
						user: null,
					},
				});
			}
		} catch (error) {
			console.error(error);
			Dispatch({
				type: "INTIAL",
				payload: {
					user: null,
				},
			});
		}
	}, [storageAvaliable]);

	

	useEffect(() => {
		initialize();
	}, []);

	const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

    const status = state.IsInitialized ? 'loading' : checkAuthenticated;

	const memoizedValue = useMemo(
		() => ({
			IsInitialized: status === 'loading',
			IsAuthenticated: status === 'authenticated',
			IsUnauthenticated: status === 'unauthenticated',
			user: state.user,
			method: "jwt",
			login,
			register,
			logout,
		}),
		[
			status,
			state.user,
			login,
			logout,
			register,
		],
	);

	return (
		<AuthContext.Provider value={memoizedValue}>
			{children}
		</AuthContext.Provider>
	);
}
