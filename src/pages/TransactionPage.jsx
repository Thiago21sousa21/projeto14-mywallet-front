import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"

export default function TransactionsPage() {
  const [formTransaction, setFormTransaction] = useState({value:'', description:''});
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);


  function uptadeFormTransaction(event){
    const {id, value} = event.target;
    const newFormTransaction = {...formTransaction};
    newFormTransaction[id] = value;
    setFormTransaction(newFormTransaction);
    //console.log(newFormTransation);
  }

  async function sendDataTransaction (event){
    event.preventDefault();
    console.log(' FAZENDO TRANSAÇÃO...')
    try{
      const result = await axios.post(`http://localhost:5000/nova-transacao/${params.tipo}`, formLogin);
      console.log('SUCESSO NO LOGIN',result);
    }catch(erro){
      console.log(erro);
    }
    setFormLogin({email:'', password:''});
    navigate('/home');
  }
  

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={(e)=>sendDataTransaction(e)}>
        <input placeholder="Valor" type="text"
          id="value" value={formTransaction.value}
          onChange={e => uptadeFormTransaction(e)}
        />
        <input placeholder="Descrição" type="text" 
          id="description" value={formTransaction.description}
          onChange={e => uptadeFormTransaction(e)}
        />
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
