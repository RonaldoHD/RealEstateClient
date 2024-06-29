import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { MatxTheme } from "./components";
// ALL CONTEXTS
import { AuthProvider } from "./contexts/JWTAuthContext";
import SettingsProvider from "./contexts/SettingsContext";
import { NotificationProvider } from './contexts/NotificationContext';

// ROUTES
import routes from "./routes";
// FAKE SERVER
import "../fake-db";

export default function App() {
  const content = useRoutes(routes);

  return (
    <NotificationProvider>
      <SettingsProvider>
        <AuthProvider>
          <MatxTheme>
            <CssBaseline />
            {content}
          </MatxTheme>
        </AuthProvider>
      </SettingsProvider>
    </NotificationProvider>
  );
}
