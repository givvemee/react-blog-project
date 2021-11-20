
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";

// 회원가입 또는 로그인 폼을 보여주는 컴포넌트

const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`
const StyledInput = styled.input`
    font-style: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    &+& {
        margin-top: 1rem;
    }
`

// 폼 하단에 로그인 혹은 회원가입 링크를 보여 줌
const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover {
            color: ${palette.gray[9]};
        }
    }
`

// 여백
const ButtonWithMarginTop = styled(Button)`
    margin-top: 1rem;
`

const textMap = {
    login: 'Log in',
    register: 'Sign Up'
}

// showing Error
const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`


const AuthForm = ({type, form, onChange, onSubmit, error}) => {
    const text = textMap[type]

    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <StyledInput autoComplete="username" name="username" placeholder="id" onChange={onChange} value={form.username}/>
                <StyledInput autoComplete="new-password" name="password" placeholder="password" type="password" onChange={onChange} value={form.password}/>
                {
                    type === 'register' && 
                    (<StyledInput autoComplete="new-password" name="passwordConfirm" placeholder="Confirm Password" type="password" onChange={onChange} value={form.passwordConfirm}/>)
                }
                {
                    error && 
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <ButtonWithMarginTop red fullWidth>{text}</ButtonWithMarginTop>
            </form>
            <Footer>
                {
                    type === 'login' ? (<Link to="/register">Sign Up</Link>) : (<Link to="/login">Log in</Link>)
                }
            </Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;