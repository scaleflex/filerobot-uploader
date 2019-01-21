const commonTheme = {
  textFontSize: '14px',

  colors: {
    success: '#5cb85c',
    warning: '#f0ad4e',
    error: '#d9534f',
    muted: '#636c72',

    base: 'light',

    light: {
      base: '#F9FAFB',
      dark: '#F4F6F8',
      darker: '#DFE4E8',
    },

    dark: {
      base: '#1e262c',
      light: '#454F5B',
      lighter: '#637381',
    },

    primary: {
      base: '#181830',
      light: '#263138',
      lighter: '#34444c',
      dark: '#101021',
      darker: '#090912',

      text: '#F9FAFB'
    },

    secondary: {
      base: '#00707c',
      light: '#007E8A',
      lighter: '#008D99',
      dark: '#00616D',
      darker: '#005662',

      text: '#F9FAFB'
    },

    text: {
      base: '#F9FAFB',
      dark: '#F4F6F8',
      mute: '#aaa',
      light: '#fff'
    },

    background: {
      base: '#f1f1f1'
    },

    border: {
      base: '#ccc'
    },

    link: {
      base: '#00707c',
      over: '#00616D',
    },

    brand: {
      success: '#5cb85c',
      warning: '#f0ad4e',
      error: '#d9534f',
      muted: '#636c72'
    }
  },

  modal: {
    borderRadius: '4px',
    fluid: {
      xs: '35%',
      sm: '45%',
      md: '60%',
      lg: '80%',
      xl: '90%'
    },
    fixed: {
      xs: '200px',
      sm: '300px',
      md: '450px',
      lg: '650px',
      xl: '800px'
    }
  },

  button: {
    tt: 'none'
  },
}


export const dark = {
  ...commonTheme,

  // backgrounds
  mainBackgroundColor: '#1e262c',
  mainBackgroundColorHover: '#263138',
  mainBackgroundColorActive: '#34444c',

  secondBackgroundColor: '#263138',

  // text
  textColor: '#e7f1f4',
  textColorHover: '#fff',
  textMuted: '#70777f',

  // border
  borderColor: '#70777f',
  borderDarkColor: '#161e23',

  fieldWidth: '120px',
  borderInputColor: '#3b4d54',
  borderInputColorHover: '#52686d',
  borderInputColorActive: '#52686d',
  inputBackgroundColor: '#34444c',
  inputBoxShadowColor: '#03a9bb',
  inputPlaceholderColor: '#888d94',


  // main color
  mainThemeColor: '#00707c',
  mainThemeColorHover: '#00616D',
  mainThemeColorOpacity: 'rgba(0, 112, 124, 0.5)',

  btnSaveColor: '#009345',
  btnSaveColorHover: '#00b549',

  btnThemeColor: '#34444c',

  btnPaddingSm: '2px 14px',
  btnFontSizeSm: '12px',
  btnBorderRadius: '2px',

  modalOverlayColor: '#484848',

  btnMainColor: (props) => `
    color: #fff;
    background-color: ${props.theme.mainThemeColor || '#009345'};
    border-color: ${props.theme.mainThemeColor || '#009345'};
    
    :hover {
      color: #fff;
      background-color: ${props.theme.mainThemeColorHover || '#00b549'};
      border-color: ${props.theme.mainThemeColorHover || '#00b142'};
    }
    
    :focus {
      -webkit-box-shadow: 0 0 0 2px ${props.theme.mainThemeColorOpacity};
              box-shadow: 0 0 0 2px ${props.theme.mainThemeColorOpacity};
    }
    
    :active {
      color: #fff;
      background-color: ${props.theme.mainThemeColorHover || '#00c559'};
      background-image: none;
      border-color: ${props.theme.mainThemeColorHover || '#00c252'};
    }
    
    ${props.disabled ? `
      background-color: ${props.theme.mainThemeColorOpacity || '#009345'};
      border-color: ${props.theme.mainThemeColorOpacity || '#009345'};
    ` : ''}
    
    ${props.active ? `
       color: #fff;
      background-color: ${props.theme.mainThemeColorHover || '#00c559'};
      background-image: none;
      border-color: ${props.theme.mainThemeColorHover || '#00c252'};
    ` : ''}
  `,

  button: {
    ...commonTheme.button,

    sm: {
      p: '4px 10px',
      fz: '12px'
    },
    md: {
      p: '6px 12px',
      fz: '14px'
    },
    lg: {
      p: '8px 14px',
      fz: '16px'
    }
  },

  modal: {
    ...commonTheme.modal,

    backgroundColor: '#1e262c',
    color: '#e7f1f4',
    colorMuted: '#70777f',
    colorMutedHover: '#e7f1f4'
  }
}