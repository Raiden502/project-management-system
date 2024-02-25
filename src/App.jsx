import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'src/auth/JwtContext';
import { store, persistor } from 'src/redux/store';
import Router from 'src/routes/index.jsx';
import ThemeProvider from 'src/theme';
// import { SnackBarProvider } from "src/providers/snackbar/SnackbarContext.jsx";
import { ChatProvider } from 'src/providers/socket/ChatProviders';
import { CallProvider } from 'src/providers/socket/CallProviders';

function App() {
    return (
        <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ReduxProvider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <ThemeProvider>
                            <ChatProvider>
                                <BrowserRouter>
                                    <CallProvider>
                                        <Router />
                                    </CallProvider>
                                </BrowserRouter>
                            </ChatProvider>
                        </ThemeProvider>
                    </PersistGate>
                </ReduxProvider>
            </LocalizationProvider>
        </AuthProvider>
    );
}

export default App;
