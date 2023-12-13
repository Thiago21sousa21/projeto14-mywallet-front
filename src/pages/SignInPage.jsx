/* eslint-disable react/button-has-type */
/* eslint-disable no-alert */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import MyWalletLogo from '../components/MyWalletLogo';
import generalContexts from '../context/context';

export default function SignInPage() {
  const [formLogin, setFormLogin] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(generalContexts);

  function uptadeFormLogin(event) {
    const { id, value } = event.target;
    const newFormLogin = { ...formLogin };
    newFormLogin[id] = value;
    setFormLogin(newFormLogin);
  }

  async function sendDataLogin(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/`, formLogin);
      setLoading(false);
      setToken(result.data.token);
      localStorage.setItem('localToken', result.data.token);
      setFormLogin({ email: '', password: '' });
      navigate('/home');
    } catch (erro) {
      alert(erro.response.data);
    }
  }

  return (
    <SingInContainer>
      <form onSubmit={(e) => sendDataLogin(e)}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          id="email"
          value={formLogin.email}
          onChange={(e) => uptadeFormLogin(e)}
          data-test="email"
          required
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          id="password"
          value={formLogin.password}
          onChange={(e) => uptadeFormLogin(e)}
          data-test="password"
          required
        />

        {loading ? <ThreeDots /> : <button data-test="sign-in-submit">Entrar</button>}

      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
