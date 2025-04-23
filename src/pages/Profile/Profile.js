import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {Container, Alert, Button, TextField} from '@mui/material'
import axios from 'axios';
import './styles.css';

export default function Profile() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const jwt = localStorage.getItem('jwt');


    // 회원 정보 수정
    const handleEdit = async (event) => {
        event.preventDefault();
        // const jwt = localStorage.getItem('jwt');
        const data = {};
        if(name){ data.name = name; }
        if(pw){ data.password = pw; }
        console.log(data);
        if (window.confirm("저장하시겠습니까?")) {
            try {
                const response = await axios.patch(`${API_BASE_URL}/user`, data, {
                    headers: {
                        Authorization: jwt,
                        'Content-Type': 'application/json'
                    },
                });
                setAlertMsg('저장되었습니다.');
                setError(false);
            } catch (error) {
                setAlertMsg('실패되었습니다. 관리자에게 문의하세요.');
                setError(true);
                console.log(error);
            }
        }
    };

    // 회원 탈퇴
    const handleDelete = async (event) => {
        event.preventDefault();
        const jwt = localStorage.getItem('jwt');
        if (window.confirm("탈퇴하시겠습니까?")) {
            try {
                const response = await axios.delete(`${API_BASE_URL}/user`, {
                    headers: {
                        Authorization: jwt,
                    },
                });
                alert("탈퇴되었습니다");
                localStorage.removeItem('jwt');
                navigate('/');
            } catch (error) {
                setAlertMsg('실패되었습니다. 관리자에게 문의하세요.');
                setError(true);
                console.log(error);
            }
        }
    };

    // 회원 정보 불러오기
    useEffect(() => {
        if (!jwt) navigate("/Login");
        axios.get(`${API_BASE_URL}/user`, {
            headers: {
                Authorization: jwt,
            }
        }).then((response) => {
            setEmail(response.data.email);
            setName(response.data.name);
        }).catch((error) => {
            setAlertMsg('유저 정보 불러오기 실패. 다시 시도해주세요.');
            setError(true);
            console.log(error);
        })
    }, []);


    return (
        <form onSubmit={handleEdit}>
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
                            <p style={{fontSize: 40,}}>회원정보 조회/수정</p>
                            <br/>
                        </td>
                    </tr>
                    <tr>
                        <td  colSpan={3}>{alertMsg &&
                            <Alert severity={error ? "error" : "success"}>{alertMsg}</Alert>}</td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td colSpan={2}>
                            <TextField
                                disabled
                                type="email"
                                value={email}
                                size={"small"}
                                sx={{width:"80%"}}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>패스워드</td>
                        <td colSpan={2}>
                            <TextField
                                type="password"
                                placeholder="변경을 원할 경우 입력해주세요."
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                size={"small"}
                                sx={{width:"80%"}}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>이름</td>
                        <td colSpan={2}>
                            <TextField
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                size={"small"}
                                sx={{width:"80%"}}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <Button variant="contained"sx={{marginX:"3px"}} type="submit" >저장</Button>
                            <Button variant="contained" sx={{marginX:"3px"}} color="error" onClick={handleDelete}>탈퇴</Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Container>
        </form>
    );
}