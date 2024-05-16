import { useEffect, useState } from "react";
import { InputField } from "./InputField";
import { SpinnerButton } from "./SpinnerButton";

export function SignUpForm() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [isVaildText, setIsVaildText] = useState('');
  const [isVaildTextColor, setIsVaildTextColor] = useState('red');
  const [isVaildTextDisplay, setIsVaildTextDisplay] = useState('none');


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
    console.log(pw + " \t " + pw2)
    if (pw?.replace(/\s+/g, '') === "") {
      setIsVaildTextDisplay("");
      setIsVaildText("비밀번호를 입력해주세요.");
    }
    else if (pw !== pw2) {
      setIsVaildTextDisplay("");
      setIsVaildTextColor("red");
      setIsVaildText("비밀번호가 일치하지 않습니다.");
    } else {
      setIsVaildTextDisplay("");
      setIsVaildTextColor("green");
      setIsVaildText("비밀번호가 일치합니다.");
    }
  }, [pw, pw2])

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직
    console.log('Logging in with', { id, pw });
  };

  return (<form onSubmit={handleSubmit} className='login-form'>
    <div className="slide-container">
    <InputField label="아이디" value={id} onChange={handleIdChange} />
    <InputField label="비밀번호" type="password" value={pw} onChange={handlePwChange} />
    <InputField label="비밀번호 확인" type="password" value={pw2} onChange={handlePw2Change} />
    <p className="check-vaild-text" style={{ color: isVaildTextColor, display: isVaildTextDisplay }}>{isVaildText}</p>
    </div>
    <div className="slide-container">
    </div>
  </form>)
}