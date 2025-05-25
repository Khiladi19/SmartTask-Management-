import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../features/auth/authSlice';

function OAuthSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    const userInfo = JSON.parse(atob(token.split('.')[1])); // Decoding JWT payload
    dispatch(loginSuccess({ user: userInfo, token }));
    localStorage.setItem('userToken', token);
    navigate('/');
  }, [dispatch, navigate]);

  return <div>Logging in via Google...</div>;
}

export default OAuthSuccess;
