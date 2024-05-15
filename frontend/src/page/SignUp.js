import React, { useEffect, useState } from 'react';
import { InputField } from '../components/InputField';
import '../style/loginStyle.css';
import { Header } from '../components/Header';
import { SpinnerButton } from '../components/SpinnerButton';
import { checkDupUsername } from '../util/account-service';


export function SignUp() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [isVaildText, setIsVaildText] = useState('');
  const [isVaildTextColor, setIsVaildTextColor] = useState('red');
  const [isVaildTextDisplay, setIsVaildTextDisplay] = useState('none');
  const [IsPasswordMatch, setIsPsswordMatch] = useState(false); // 비밀번호가 확인비밀번호와 일치하는 지

  // 비밀번호 일치하는지 체크
  const checkPasswordMatch = () => {
    if (pw?.replace(/\s+/g, '') === "" || pw2?.replace(/\s+/g, '') === "") {
      setIsVaildTextDisplay("none");
      setIsVaildText("비밀번호를 입력해주세요.");
      setIsPsswordMatch(false);

    }
    else if (pw !== pw2) {
      setIsVaildTextDisplay("");
      setIsVaildTextColor("red");
      setIsVaildText("비밀번호가 일치하지 않습니다.");
      setIsPsswordMatch(false);

    } else {
      setIsVaildTextDisplay("");
      setIsVaildTextColor("green");
      setIsVaildText("비밀번호가 일치합니다.");
      setIsPsswordMatch(true);
    }
  }


  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
  };
  const handlePw2Change = async (e) => {
    setPw2(e.target.value);
  };

  useEffect(() => {
    // 비밀번호 일치 여부 확인
    checkPasswordMatch();

  }, [pw, pw2])

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
        <InputField label="비밀번호" type="password" value={pw} onChange={handlePwChange} />
        <InputField label="비밀번호 확인" type="password" value={pw2} onChange={handlePw2Change} />
        <p className="check-vaild-text" style={{ color: isVaildTextColor, display: isVaildTextDisplay }}>{isVaildText}</p>
        <SpinnerButton title={'다음'} onBtnClicked={async () => {
          // 해당 아이디가 이미 존재할 경우,
          if (await checkDupUsername(id)) {
            alert("중복된 아이디가 이미 존재합니다.");
            return;
          }
          if (!IsPasswordMatch) {
            alert("비밀번호가 일치하지 않습니다.");
            // 포커스 어떻게 주지..
            return;
          }
          alert("정상 아이디 발행")

          // 아이디 
        }
        } />
      </form>
    </div>
  </>
  );
};