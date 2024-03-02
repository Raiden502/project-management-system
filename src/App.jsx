import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'src/auth/JwtContext';
import { store, persistor } from 'src/redux/store';
import Router from 'src/routes/index.jsx';
import ThemeProvider from 'src/theme';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { ChatProvider } from 'src/providers/socket/ChatProviders';
import { CallProvider } from 'src/providers/socket/CallProviders';

function App() {
    return (
        <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ReduxProvider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <ThemeProvider>
                            <SnackbarProvider>
                                <BrowserRouter>
                                    <ChatProvider>
                                        <CallProvider>
                                            <Router />
                                        </CallProvider>
                                    </ChatProvider>
                                </BrowserRouter>
                            </SnackbarProvider>
                        </ThemeProvider>
                    </PersistGate>
                </ReduxProvider>
            </LocalizationProvider>
        </AuthProvider>
    );
}

export default App;
