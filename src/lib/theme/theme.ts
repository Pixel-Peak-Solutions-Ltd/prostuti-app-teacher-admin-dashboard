import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2970FF',
      dark: '#0d47a1',
      light: '#EFF4FF'
    },
    secondary: {
      main: '#c51162',
      dark: '#890b44'
    },
    grey: {
      700: '#9CA3AF',
    }
  },
  typography: {
    fontFamily: 'Figtree',
    h6: {
      fontSize: '20px'
    },
    button: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0.02857em',
      textTransform: 'none'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          body: {
            fontFamily: 'Figtree',
          }
        }
      }
    },
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
