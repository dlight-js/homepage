import { styled } from "@dlightjs/emotion"

export const Div = {
  Preview: styled.div`
        width: calc(100vw - 600px);
        height: calc(100vh - 30px);
    `,
  Output: styled.div`
        height: calc(100vh - 60px);
        display: ${({ displayed }: any) => displayed ? "block" : "none"};
    `,
  Title: styled.div`
        width: 100%;
        background-color: ${({ backgroundColor }: any) => backgroundColor};
        padding: 5px 15px 5px 15px;
    `,
  Tabs: styled.div`
        background-color: ${({ backgroundColor }: any) => backgroundColor};
        /* padding: 0px 10px; */
        width: 600px;
        overflow: scroll;
        ::-webkit-scrollbar {
            display: none;
        }
        height: 30px;
        border-right: ${({ borderColor }: any) => borderColor} solid 3px;
        border-top: ${({ borderColor }: any) => borderColor} solid 1px;
    `,
  TabWrap: styled.div`
        background-color: ${({ backgroundColor }: any) => backgroundColor};
        padding: 0px 10px;
        height: 30px;
    `,
  SubTitle: styled.p`
        color: ${({ color }: any) => color};
    `,
  HeaderBG: styled.div`
        background-color: ${({ backgroundColor }: any) => backgroundColor};
        width: 100%;
        height: 30px;
        overflow: hidden;
        border-top: ${({ borderColor }: any) => borderColor} solid 1px;
    `
}

export const Button = {
  Header: styled.button`
        border-width: 0;
        background-color: ${({ backgroundColor }: any) => backgroundColor};
        color: ${({ color }: any) => color};
        font-size: 17px;
        width: 50%;
        height: 30px;
        cursor: pointer;
    `
}

export const Iframe = {
  Playground: styled.iframe`
        width: 100%;
        height: 100%;
        border-width: 0;
        background-color: ${({ backgroundColor }: any) => backgroundColor};
        display: ${({ displayed }: any) => displayed ? "block" : "none"};
    `
}

export const Text = {
  SubTitle: styled.h3`
        color: ${({ color }: any) => color};
    `
}
