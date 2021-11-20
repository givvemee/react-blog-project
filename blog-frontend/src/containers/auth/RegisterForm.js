import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, register } from '../../modules/auth';
import user, { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({history}) => {

    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const {form, auth, authError, user} = useSelector(({auth, user}) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }))

    // input event
    const onChange = e => {
        const {value, name} = e.target
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        )
    }

    // form submit event
    const onSubmit = e => {
        e.preventDefault()
        const {username, password, passwordConfirm} = form;
        // 빈칸이 있다면
        if ([username, passwordConfirm, password].includes('')) {
          setError('Fill the blank')
          return;
        }
        // 비밀번호가 일치하지 않는다면
        if (password !== passwordConfirm) {
            setError('Password does not match')
            dispatch(changeField({form: 'register', key: 'password', value:''}))
            dispatch(changeField({form: 'register', key: 'passwordConfirm', value:''}))
            return;
        }
        dispatch(register({username, password}))
    }

    // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
    useEffect(() => {
        dispatch(initializeForm('register'))
    }, [dispatch])

    // 회원가입 성공과 실패 처리
    useEffect(() => {
        if (authError) {
          // 계정명이 이미 존재
          if (authError.response.status === 409) {
            setError('The username is already in use')
            return;
          }
          // 기타 이유
          setError('Register Failed')
          return ;
        }
        if (auth) {
            console.log('회원가입 성공')
            console.log(auth)
            dispatch(check())
        }
    }, [auth, authError, dispatch])

    // user 값이 잘 설정되었는지 확인
    useEffect(() => {
      if (user) {
        history.push('/')
        try {
          localStorage.setItem('user', JSON.stringify(user))
        } catch (e) {
          console.log('localStorage is not working')
        }
      }
    }, [history, user])

    return (
        <AuthForm type="register" form={form} onChange={onChange} onSubmit={onSubmit} error={error}/>
    );
};

export default withRouter(RegisterForm)