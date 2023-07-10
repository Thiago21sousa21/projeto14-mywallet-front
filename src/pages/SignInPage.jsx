import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react";
import axios from "axios";
import CONTEXT from "../context/context";

export default function SignInPage() {
  const [formLogin, setFormLogin] = useState({email:'', password:''});
  const navigate = useNavigate();
  let {token} = useContext(CONTEXT);
  console.log(import.meta.env.VITE_API_URL);

  function uptadeFormLogin(event){
    const {id, value} = event.target;
    const newFormLogin = {...formLogin};
    newFormLogin[id] = value;
    setFormLogin(newFormLogin);
    //console.log(newFormLogin);
  }

  async function sendDataLogin (event){
    event.preventDefault();
    console.log(' FAZENDO LOGIN...', formLogin)
    try{
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/`, formLogin);
      console.log('SUCESSO NO LOGIN',result);
      localStorage.setItem('localToken', result.data.token);
      token = localStorage.getItem('localToken');
      console.log(token);
      setFormLogin({email:'', password:''});
      navigate('/home');
    }catch(erro){
      alert(erro.response.data);
    }

  }

  return (
    <SingInContainer>
      <form onSubmit={e => sendDataLogin(e)}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email"
          id="email" value={formLogin.email}
          onChange={e => uptadeFormLogin(e)}
          data-test="email"
        />
        <input placeholder="Senha" type="password" autoComplete="new-password" 
          id="password" value={formLogin.password}
          onChange={e => uptadeFormLogin(e)}
          test="password"
        />
        <button data-test="sign-in-submit" >Entrar</button>
      </form>

      <Link to={'/cadastro'}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
