import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CONTEXT from "../context/context";

export default function HomePage(props) {
  const {setData, data } = props;
  const navigate = useNavigate();
  let {token} = useContext(CONTEXT);
  //console.log(token, ' so pra ver se esse contexto presta')
  if(!token){
    token = localStorage.getItem('localToken');
  }
  const config = {
    headers:{
      authorization: `Bearer ${token}`
    }
  }

useEffect(()=>{
  if(!token)return navigate('/');
  axios.get(`${import.meta.env.VITE_API_URL}home`, config)
    .then(res=>{
      console.log(res);
      setData(res.data);
    })
    .catch(erro=>console.log(erro));
},[]);

function exit(){
  token = '';
  localStorage.removeItem('localToken');
  navigate('/');
}

  if(data==='loading...')return data;
  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name" >Olá, {data.name}</h1>
        <BiExit  onClick={exit} data-test="logout"/>
      </Header>

      <TransactionsContainer>
        <ul>
          {data.transactions.map((data, i) =>(
            <ListItemContainer key={i}>
            <div>
              <span>{data.time}</span>
              <strong data-test="registry-name">{data.description}</strong>
            </div>
            <Value color={data.tipo === 'saida' ? "negativo" : 'positivo'} data-test="registry-amount">{data.value}</Value>
          </ListItemContainer>
          ))}
          

          {/* <ListItemContainer>
            <div>
              <span>15/11</span>
              <strong>Salário</strong>
            </div>
            <Value color={"positivo"}>3000,00</Value>
          </ListItemContainer> */}
        </ul>

        <article>
          <strong>SALDO</strong>
          <Value color={data.balance >= 0 ? 'positivo' : 'negativo'} data-test="total-amount">{data.balance}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <Link to={`/nova-transacao/entrada`} className="buttonLink" data-test="new-income">
        <button >
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        </Link>
        <Link to={'/nova-transacao/saida'} className="buttonLink" data-test="new-expense">
        <button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
        </Link>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  .buttonLink {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`