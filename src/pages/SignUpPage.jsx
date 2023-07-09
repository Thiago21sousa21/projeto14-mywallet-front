import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const [valuesForm, setValuesForm] = useState({name:'', email:'', password:'', confirm:''}) ;



  function updateValuesInputs(event){
    const {id, value}=event.target;
    //console.log(event.target);
    //const newValuesForm = {...valuesForm, [id]: value}
    const newValuesForm = {...valuesForm};
    newValuesForm[id] = value;
    //console.log(newValuesForm);
    setValuesForm(newValuesForm);
  }


  async function sendData (event){
    event.preventDefault();
    console.log('CADASTRANDO NOVO USUARIO...')
    if(valuesForm.password !== valuesForm.confirm)return alert('as senhas precisam ser iguais!');
    try{
      const result = await axios.post(`${import.meta.env.VITE_API_URL}`, {name:valuesForm.name, email: valuesForm.email, password: valuesForm.password});
      console.log(result);
      setValuesForm({name:'', email:'', password:'', confirm:''});
      return alert('cadastro criado com sucesso!');
    }catch(erro){
      console.log('falhou o cadastro', erro)
      alert(erro.response.data);
    }
  }



  return (
    <SingUpContainer>
      <form onSubmit={e => sendData(e)}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" 
          onChange={(e)=>updateValuesInputs(e)}
          id="name" value={valuesForm.name}
          data-test="name"
        />
        <input placeholder="E-mail" type="email"
          onChange={(e)=>updateValuesInputs(e)}
          id="email" value={valuesForm.email}
          data-test="email"
        />
        <input placeholder="Senha" type="password" autocomplete="new-password" 
          onChange={(e)=>updateValuesInputs(e)}
          id="password" value={valuesForm.password}
          data-test="password"
        />
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" 
          onChange={(e)=>updateValuesInputs(e)}
          id="confirm" value={valuesForm.confirm}
          data-test="conf-password"
        />
        <button data-test="sign-up-submit" >Cadastrar</button>
      </form>

      <Link to={'/'}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
