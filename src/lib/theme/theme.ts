import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: purple[500],
  //     },
  //     secondary: {
  //       main: green[500],
  //     },
  //   },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {},
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
  },
});

export default theme;
