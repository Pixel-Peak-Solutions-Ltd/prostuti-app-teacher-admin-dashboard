import { ReactNode } from "react";
import theme from "../theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import CssBaseline from '@mui/material/CssBaseline';
import { SocketProvider } from '../../features/chat/context/SocketContext';

const Providers = ({ children }: { children: ReactNode; }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SocketProvider>

        {children}
      </SocketProvider>
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;
