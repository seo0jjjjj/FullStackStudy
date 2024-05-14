import React, { useState, useCallback } from 'react';
import { InputField } from '../components/InputField';
import { NavLink } from 'react-router-dom';
import '../style/loginStyle.css';
import { Header } from '../components/Header';
import { SpinnerButton } from '../components/SpinnerButton';


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
    <div className='login-container'>
      <Header title="Login" />
      <form onSubmit={handleSubmit} className='login-form'>
        <InputField label="아이디" value={id} onChange={handleIdChange} />
        <InputField label="비밀번호" value={pw} onChange={handlePwChange} />
        <SpinnerButton type="submit" className='btn-sign-in' title={'로그인'} onBtnClicked={async ()=> {
          return new Promise((res,rej) => {
              setTimeout(()=>{
                console.log("버튼 활성화");
                res(1);
              },3000);
          })
        }}/>
      </form>
        <p>
        <span>회원이 아니신가요?</span>
        <NavLink to={"/sign-up"} className={'sigin-up-text'}>회원가입하기</NavLink>
        </p>
    </div>
  </>
  );
};

