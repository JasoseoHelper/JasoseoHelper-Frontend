import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const handleLogin = async (event) =>{
        event.preventDefault();
        const data = {
            email: email,
            pw: password,
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth/login`, data
            );
            const jwt = response.data.accessToken;
            localStorage.setItem('jwt', jwt); // 또는 쿠키에 저장
            alert('로그인 성공!');
            // 이후 페이지 이동
        } catch (err) {
            setErrorMsg('로그인 실패! 이메일 또는 비밀번호를 확인하세요.');
        }

    }


    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">로그인</button>
            {errorMsg && <p>{errorMsg}</p>}
        </form>
    );
}