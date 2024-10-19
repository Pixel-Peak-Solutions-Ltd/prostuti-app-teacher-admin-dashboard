import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body1_light: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    body1_light?: React.CSSProperties;
  }
}

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
    body1_light: {
      fontSize: '15px',
      lineHeight: '20px',
      fontWeight: 400,
      color: '#344054'
    },
    h3: {
      fontSize: '30px',
      lineHeight: '38px',
      fontWeight: '600'
    },
    h6: {
      fontSize: '20px'
    },
    body2: {
      fontSize: '1rem',
      lineHeight: '24px',
      fontWeight: 400,
      color: '#475467'
    },
    body1: {
      fontSize: '15px',
      lineHeight: '20px',
      fontWeight: 600,
      color: '#344054'
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
