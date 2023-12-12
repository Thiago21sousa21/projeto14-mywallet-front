import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import CONTEXT from "../context/context";

export default function TransactionsPage(props) {
  const { setData } = props;
  const [formTransaction, setFormTransaction] = useState({ value: '', description: '' });
  const navigate = useNavigate();
  const params = useParams();
  let { token } = useContext(CONTEXT);
  if (!token) token = localStorage.getItem('localToken');

  useEffect(() => {
    if (!token) return navigate('/');
  }, []);
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  function uptadeFormTransaction(event) {
    const { id, value } = event.target;
    const newFormTransaction = { ...formTransaction };
    newFormTransaction[id] = value;
    setFormTransaction(newFormTransaction);
  }

  async function sendDataTransaction(event) {
    event.preventDefault();
    console.log(' FAZENDO TRANSAÇÃO...')
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${params.tipo}`, formTransaction, config);
      setFormTransaction({ email: '', password: '' });

      const atualizaTransactions = await axios.get(`${import.meta.env.VITE_API_URL}/home`, config)
      setData(atualizaTransactions.data);
      navigate('/home');
    } catch (erro) {
      alert(erro.response.data);
    }
  }


  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={(e) => sendDataTransaction(e)}>
        <input placeholder="Valor" type="number"
          id="value" value={formTransaction.value}
          onChange={e => uptadeFormTransaction(e)}
          data-test="registry-amount-input"

        />
        <input placeholder="Descrição" type="text"
          id="description" value={formTransaction.description}
          onChange={e => uptadeFormTransaction(e)}
          data-test="registry-name-input"
        />
        <button data-test="registry-save">Salvar TRANSAÇÃO</button>
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
