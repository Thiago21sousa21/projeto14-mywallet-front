import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import axios from "axios";

export default function SignInPage() {
  const [formLogin, setFormLogin] = useState({email:'', password:''});
  const navigate = useNavigate();

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
      const result = await axios.post('http://localhost:5000/', formLogin);
      console.log('SUCESSO NO LOGIN',result);
      setFormLogin({email:'', password:''});
      navigate('/home');
    }catch(erro){
      console.log(erro);
    }

  }

  return (
    <SingInContainer>
      <form onSubmit={e => sendDataLogin(e)}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email"
          id="email" value={formLogin.email}
          onChange={e => uptadeFormLogin(e)}
        />
        <input placeholder="Senha" type="password" autocomplete="new-password" 
          id="password" value={formLogin.password}
          onChange={e => uptadeFormLogin(e)}
        />
        <button>Entrar</button>
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
