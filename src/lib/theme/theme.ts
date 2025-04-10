import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body1_light: React.CSSProperties;
    body2_extended: React.CSSProperties;
    body1_extended: React.CSSProperties;
    h7: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    body1_light?: React.CSSProperties;
    body2_extended?: React.CSSProperties;
    body1_extended?: React.CSSProperties;
    h7: React.CSSProperties;
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
      500: '#70707B',
      700: '#9CA3AF',
      900: '#b8c1d1'
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
      fontWeight: '600',
      color: '#3F3F46'
    },
    h6: {
      fontSize: '20px',
      color: '#3F3F46'
    },
    h7: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '600',
      color: '#3F3F46'
    },
    body2_extended: {
      fontSize: '1rem',
      lineHeight: '24px',
      fontWeight: 400,
      color: '#475467'
    },
    body1_extended: {
      fontSize: '15px',
      lineHeight: '20px',
      fontWeight: 600,
      color: '#344054'
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: '24px',
      fontWeight: 400,
      color: '#475467'
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
