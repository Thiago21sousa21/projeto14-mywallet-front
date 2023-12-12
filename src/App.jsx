import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState } from "react"
import CONTEXT from './context/context'


export default function App() {
  const [data, setData] = useState('loading...');
  const [token, setToken] = useState('');
  return (
    <CONTEXT.Provider value={{ token, setToken }} >
      <PagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage data={data} setData={setData} />} />
            <Route path="/nova-transacao/:tipo" element={<TransactionsPage setData={setData} />} />
          </Routes>
        </BrowserRouter>
      </PagesContainer>
    </CONTEXT.Provider>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
