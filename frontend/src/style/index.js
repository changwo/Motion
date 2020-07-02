import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-size: 16px;
        box-sizing: border-box;
        color: black;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        
        button {
          border: none;
        }
        
        :focus {
            outline: none;
        }
        a{
            text-decoration: none;
        }


    }

    @function rem($size) {
        $remsize: $size / 16px;
        @return #{$remsize}rem;
    }



`;

export const defaultTheme = {
  borderRadius: "5px",
  fontColor: "#861010",
  themeColor: "#A580FF",
  filterGrey:
    "invert(56%) sepia(0%) saturate(14%) hue-rotate(11deg) brightness(93%) contrast(92%)",
  filterTheme:
    "invert(53%) sepia(37%) saturate(2438%) hue-rotate(220deg) brightness(102%) contrast(101%)",
  imageColor: "linear-gradient(141deg, #c468ff 4%, #6e91f6 100%)",
  signInBotton: "linear-gradient(102deg, #c468ff 0%, #6e91f6)",
  sendButton: "linear-gradient(133deg, #c468ff 3%, #6e91f6)",
  boxShadow: "0 10px 20px 0 rgba(0, 0, 0, 0.05), 0 0 1px 0 rgba(0, 0, 0, 0.2);",
  athensGray: "#FAFAFA",
  galleryGray: "#E0E0E0",
};
