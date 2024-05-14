import React, { useState, useCallback } from 'react';
import { InputField } from '../components/InputField';
import { NavLink } from 'react-router-dom';
import '../style/loginStyle.css';
import { Header } from '../components/Header';
import { Spinner } from '../components/Spinner';


export function SignUp() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');

  const handleIdChange = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const handlePwChange = useCallback((e) => {
    setPw(e.target.value);
  }, []);  
  const handlePw2Change = useCallback((e) => {
    setPw2(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직
    console.log('Logging in with', { id, pw });
  };

  return (<>
    <div className='login-container'>
      <Header title="Sign Up" />
      <form onSubmit={handleSubmit} className='login-form'>
        <InputField label="아이디" value={id} onChange={handleIdChange} />
        <InputField label="비밀번호" value={pw} onChange={handlePwChange} />
        <InputField label="비밀번호 확인" value={pw2} onChange={handlePw2Change} />
        <button type="submit">
          <div>
            <Spinner/>
          </div>
        </button>
      </form>
    </div>
  </>
  );
};