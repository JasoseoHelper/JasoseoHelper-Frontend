import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {Container, Alert, Button, TextField} from '@mui/material'
import axios from 'axios';
import './styles.css';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


    // 회원 가입
    const handleSignUp = async (event) => {
        event.preventDefault();
        if(pw !== confirmPw){
            alert("패드워드가 틀립니다. 확인해주세요");
            return;
        }
        if (window.confirm("저장하시겠습니까?")) {
            try {
                const response = await axios.post(`${API_BASE_URL}/user`,
                    {"email": email, "name":name, "pw":pw, "confirmPw":confirmPw},
                    {headers: {'Content-Type': 'application/json'}});
                alert("가입이 완료되었습니다.");
                navigate("/Login");
            } catch (error) {
                if(error.response.status === 500) alert("실패되었습니다. 관리자에게 문의하세요.");
                else alert(error.response.data);

                console.log(error);
            }
        }
    };



    return (
        <form onSubmit={handleSignUp}>
            <Container maxWidth={"md"} sx={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 2,
                padding: 3,
                backgroundColor: '#f9f9f9',
            }}>
                <table width={"70%"}>
                    <tbody>
                    <tr>
                        <td colSpan={3}>
                            <p style={{fontSize: 40,}}>회원가입</p>
                            <br/>
                        </td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td colSpan={2}>
                            <TextField
                                type="email"
                                placeholder="이메일을 입력하세요."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                size={"small"}
                                sx={{width: "80%"}}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>패스워드</td>
                        <td colSpan={2}>
                            <TextField
                                type="password"
                                placeholder="패스워드를 입력하세요."
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                required
                                size={"small"}
                                sx={{width: "80%"}}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>패스워드 확인</td>
                        <td colSpan={2}>
                            <TextField
                                type="password"
                                placeholder="패스워드를 다시 입력하세요."
                                value={confirmPw}
                                onChange={(e) => setConfirmPw(e.target.value)}
                                required
                                size={"small"}
                                sx={{width: "80%"}}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>이름</td>
                        <td colSpan={2}>
                            <TextField
                                value={name}
                                placeholder="이름을 입력하세요."
                                onChange={(e) => setName(e.target.value)}
                                required
                                size={"small"}
                                sx={{width: "80%"}}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <Button variant="contained" sx={{marginX: "3px"}} type="submit">저장</Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Container>
        </form>
    );
}