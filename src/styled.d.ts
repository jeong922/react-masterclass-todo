import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    listbg: string;
    toggle_position: string;
    border: string;
    btnBgColor: string;
    btnColor: string;
  }
}
