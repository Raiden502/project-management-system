import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'src/auth/JwtContext';
import { ThemeProvider } from 'src/providers/themes/ThemeProvider';
import { store, persistor } from 'src/redux/store';
import Router from 'src/routes/index.jsx';
// import { SnackBarProvider } from "src/providers/snackbar/SnackbarContext.jsx";
import { ChatProvider } from 'src/providers/socket/ChatProviders';
import { CallProvider } from 'src/providers/socket/CallProviders';

function App() {
    return (
        <AuthProvider>
                <ThemeProvider>
                    <ReduxProvider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <ChatProvider>
                                <BrowserRouter>
                                    <CallProvider>
                                        <Router />
                                    </CallProvider>
                                </BrowserRouter>
                            </ChatProvider>
                        </PersistGate>
                    </ReduxProvider>
                </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
