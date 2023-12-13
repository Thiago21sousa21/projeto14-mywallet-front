import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import MyWalletLogo from '../components/MyWalletLogo';

export default function SignUpPage() {
  const [valuesForm, setValuesForm] = useState({
    name: '', email: '', password: '', confirm: '',
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function updateValuesInputs(event) {
    const { id, value } = event.target;
    const newValuesForm = { ...valuesForm };
    newValuesForm[id] = value;
    setValuesForm(newValuesForm);
  }

  async function sendData(event) {
    event.preventDefault();
    setLoading(true);
    if (valuesForm.password !== valuesForm.confirm) {
      setLoading(false);
      return alert('as senhas precisam ser iguais!');
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, { name: valuesForm.name, email: valuesForm.email, password: valuesForm.password });
      setLoading(false);
      setValuesForm({
        name: '', email: '', password: '', confirm: '',
      });
      alert('cadastro criado com sucesso! Agora é so fazer login!');
      navigate('/');
    } catch (erro) {
      setLoading(false);
      console.log('falhou o cadastro', erro);
      alert(erro.response.data);
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={(e) => sendData(e)}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          onChange={(e) => updateValuesInputs(e)}
          id="name"
          value={valuesForm.name}
          data-test="name"
          required
        />
        <input
          placeholder="E-mail"
          type="email"
          onChange={(e) => updateValuesInputs(e)}
          id="email"
          value={valuesForm.email}
          data-test="email"
          required
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          onChange={(e) => updateValuesInputs(e)}
          id="password"
          value={valuesForm.password}
          minLength={3}
          data-test="password"
          required
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          onChange={(e) => updateValuesInputs(e)}
          id="confirm"
          value={valuesForm.confirm}
          data-test="conf-password"
          minLength={3}
          required
        />
        {loading ? <ThreeDots /> : <button data-test="sign-up-submit">Cadastrar</button>}
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
