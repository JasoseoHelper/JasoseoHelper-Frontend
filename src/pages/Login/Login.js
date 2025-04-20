import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {Container, Alert, Button, TextField, Avatar} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import './styles.css';

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
            <Container sx={{
                display: 'flex',
                justifyContent: 'center',
                border: '1px solid gray',
                borderRadius: 2,
                padding: 3,
                backgroundColor: '#f9f9f9',
                maxWidth: "600px"
            }}>
                <table width={"70%"}>
                    <tbody>
                        <tr>
                            <td colSpan={3}>
                                <AccountCircleIcon sx={{ fontSize: 120, color: '#1976d2'}}/>
                                <br/>
                            </td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td>
                                <TextField
                                    type="email"
                                    placeholder="이메일을 입력하세요"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    size={"small"}
                                />
                            </td>
                            <td rowSpan={2}>
                                <Button variant="contained" type="submit" sx={{height:"90px"}}>로그인</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td>
                                <TextField
                                    type="password"
                                    placeholder="비밀번호를 입력하세요"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    size={"small"}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>{errorMsg && <Alert severity="error">{errorMsg}</Alert>}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div style={{textAlign: "center", padding: "16px"}}>
                                    <p>비밀번호를 잊으셨나요? <Link to="/password-reset">비밀번호 초기화</Link></p>
                                    <p>회원이 아니신가요? <Link to="/signup">회원가입 하기</Link></p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Container>
        </form>
    );
}