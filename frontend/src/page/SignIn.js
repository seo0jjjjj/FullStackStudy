import React, { useState, useCallback } from 'react';
import { InputField } from '../components/InputField';
import { NavLink } from 'react-router-dom';


export function SignIn() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

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

  return (<>
    <h1>{"Login"}</h1>
    <form onSubmit={handleSubmit}>
      <InputField label="아이디" value={id} onChange={handleIdChange} />
      <InputField label="비밀번호" value={pw} onChange={handlePwChange} />
      <button type="submit">로그인</button>
      <NavLink to={"/sign-up"}>회원가입</NavLink>
    </form>
    </>
  );
};

