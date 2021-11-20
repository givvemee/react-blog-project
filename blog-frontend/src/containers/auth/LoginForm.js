

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, login } from '../../modules/auth';
import { withRouter } from 'react-router-dom';
import { check } from '../../modules/user';

const LoginForm = ({history}) => {
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const {form, auth, authError, user} = useSelector(({auth, user}) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }))

    // input event
    const onChange = e => {
        const {value, name} = e.target
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        )
    }

    // form submit event
    const onSubmit = e => {
        e.preventDefault()
        const {username, password} = form;
        dispatch(login({username, password}))
    }

    // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
    useEffect(() => {
        dispatch(initializeForm('login'))
    }, [dispatch])

    useEffect(() => {
      if(authError) {
        console.log('오류 발생')
        console.log(authError)
        setError('Login Failed')
        return;
      }
      if (auth) {
        console.log('로그인 성공')
        dispatch(check())
      }
    }, [auth, authError, dispatch])

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
        <AuthForm type="login" form={form} onChange={onChange} onSubmit={onSubmit} error={error}/>
    );
};

export default withRouter(LoginForm);