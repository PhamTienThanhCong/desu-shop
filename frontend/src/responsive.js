import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};
export const screen12 = (props) => {
  return css`
    @media only screen and (max-width: 1279px) {
      ${props}
    }
  `;
};
export const screen10 = (props) => {
  return css`
    @media only screen and (max-width: 1080px) {
      ${props}
    }
  `;
};
export const screen14 = (props) => {
  return css`
    @media only screen and (max-width: 1516px) {
      ${props}
    }
  `;
};