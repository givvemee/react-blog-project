
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

// 회원가입 로그인 페이지의 레이아웃 담당

// 화면의 배경
const AuthTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: ${palette.gray[2]};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

// 화면 가운데의 박스
const WhiteBox = styled.div`
    .logo-area {
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    }
    box-shadow: 0 0 8px rgba(0,0,0,0.025);
    padding: 2rem;
    width: 360px;
    background: #fff;
    border-radius: 2px;
`

const AuthTemplate = ({children}) => {
    return (
        <AuthTemplateBlock>
            <WhiteBox>
                <div className="logo-area">
                    <Link to="/">GIVVEMEE ❣️</Link>
                </div>
                {children}
            </WhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;