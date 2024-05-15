import React, { useState, useCallback } from 'react';
import { InputField } from '../components/InputField';
import { NavLink, useNavigate } from 'react-router-dom';
import '../style/loginStyle.css';
import { Header } from '../components/Header';
import { SpinnerButton } from '../components/SpinnerButton';
import { login } from '../util/account-service';


export function SignIn() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleIdChange = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const handlePwChange = useCallback((e) => {
    setPw(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직
    console.log('Logging in with', { id, pw });
  };

  const handleLoginBtn = async (e) => {
    const [status, data] = await login(id, pw);

    if (status === "login-success") {
      alert(data.message);
      navigate('/list');
    }
    else {
      alert(data.message);
    }
  }

  return (<>
    <div className='login-container'>
      <Header title="Login" />
      <form onSubmit={handleSubmit} className='login-form'>
        <InputField label="아이디" value={id} onChange={handleIdChange} />
        <InputField label="비밀번호" type="password" value={pw} onChange={handlePwChange} />
        <SpinnerButton type="submit" className='btn-sign-in' title={'로그인'} onBtnClicked={handleLoginBtn} />
      </form>
      <p>
        <span>회원이 아니신가요?</span>
        <NavLink to={"/sign-up"} className={'sigin-up-text'}>회원가입하기</NavLink>
      </p>
    </div>
  </>
  );
};

