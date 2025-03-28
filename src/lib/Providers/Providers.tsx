import { ReactNode } from "react";
import theme from "../theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;
