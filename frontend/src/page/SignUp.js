import React, { useEffect, useState } from 'react';
import { InputField } from '../components/InputField';
import '../style/loginStyle.css';
import { Header } from '../components/Header';
import { SpinnerButton } from '../components/SpinnerButton';
import { checkDupUsername, register } from '../util/account-service';
import { useNavigate } from 'react-router-dom';

const defaultImageURL = "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg";

export function SignUp() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [nickName, setNickName] = useState(''); // 유저 별명
  const [isVaildText, setIsVaildText] = useState('');
  const [onIdChanged, setOnIdChanged] = useState(false); // 아이디가 변경되었을 때, 서버에 요청을 넣지 않기 위함.
  const [isVaildTextColor, setIsVaildTextColor] = useState('red');
  const [isVaildTextDisplay, setIsVaildTextDisplay] = useState('none');
  const [IsPasswordMatch, setIsPsswordMatch] = useState(false); // 비밀번호가 확인비밀번호와 일치하는 지
  const [slidePage, setSlidePage] = useState(0); // [아이디 및 비밀번호(0)/프로필 이미지 설정(1)] 페이지번호 
  const [slideStyle, setSlideStyle] = useState({});
  const [buttonText, setButtonText] = useState("다음"); // 아이디 입력시, 버튼 '다음' 이미지까지 완료 시, '회원가입하기'로 변경
  const [file, setFile] = useState(null); // 프로필 이미지 파일
  const [previewUrl, setPreviewUrl] = useState(defaultImageURL); // 프로필 미리보기
  const navigator = useNavigate();


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
    setOnIdChanged(true);
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
  };
  const handlePw2Change = async (e) => {
    setPw2(e.target.value);
  };
  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // 파일 미리보기 URL 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };



  const onNextBtnClicked = async () => {
    // 해당 아이디가 이미 존재할 경우,
    if (slidePage === 0) {
      if (onIdChanged && await checkDupUsername(id)) {
        alert("중복된 아이디가 이미 존재합니다.");
        return;
      }
      if (!IsPasswordMatch) {
        alert("비밀번호가 일치하지 않습니다.");
        // 포커스 어떻게 주지..
        return;
      }

      // 아이디 비밀번호 정상 입력
      setSlidePage(1);
    }

    else {
      const [status, data] = await register(id, pw, nickName, file);

      if (status === "ok") {
        alert(data.message);
        navigator('/list')
      }
      else {
        alert(data.message);
      }
    }




  };
  // 페이지 벗어날때 더블 체크
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
      return ''; // 브라우저에서 확인메세지 자동으로 넣어줌
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // 컴포넌트 언마운트 시 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // 비밀번호 일치 여부 확인
    checkPasswordMatch();

  }, [pw, pw2])

  useEffect(() => {
    if (slidePage === 0) {
      setSlideStyle({ transform: "translateX(0%)" });
      document.querySelector(".bxs-chevron-left").style.display = "none";
      document.querySelector(".bxs-chevron-right").style.display = "";
      setButtonText("다음")
    }
    if (slidePage === 1) {
      setSlideStyle({ transform: "translateX(-50%)" });
      document.querySelector(".bxs-chevron-left").style.display = "";
      document.querySelector(".bxs-chevron-right").style.display = "none";
      setButtonText("회원가입 하기")
    }
  }, [slidePage])

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직
    console.log('Logging in with', { id, pw });
  };

  return (<>
    <div className='login-container'>

      <Header title="Sign Up" />
      <form onSubmit={handleSubmit} className='login-form'>
        <div className='slide-window'>
          <div className='slide-container' style={slideStyle}>
            <div className='slide-item'>
              <InputField label="아이디" value={id} onChange={handleIdChange} />
              <InputField label="비밀번호" type="password" value={pw} onChange={handlePwChange} />
              <InputField label="비밀번호 확인" type="password" value={pw2} onChange={handlePw2Change} />
              <p className="check-vaild-text" style={{ color: isVaildTextColor, display: isVaildTextDisplay }}>{isVaildText}</p>
            </div>
            <div className='slide-item profile-container'>
              <div className='profile-item'>
                <img id='profile' className='profile-image' src={previewUrl} alt="프로필 이미지" />
              </div>
              <div className='profile-item'>
                <input type='file' accept='image/*' className='profile-file-input' onChange={handleFileChange} />
                <input value={nickName} className='profile-nickname-input' onChange={handleNickNameChange} />
              </div>
            </div>

          </div>

        </div>
        <SpinnerButton title={buttonText} onBtnClicked={onNextBtnClicked} />
      </form>
      <i className='bx bxs-chevron-left arrow-btn' onClick={(event) => {
        setSlidePage(0)
      }} ></i>
      <i className='bx bxs-chevron-right arrow-btn' onClick={(event) => {
        onNextBtnClicked(event);
      }} ></i>

    </div>
  </>
  );
};