import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ResetStyle from './style/ResetStyle'
import GlobalStyle from './style/GlobalStyle'
import CONTEXT from './context/context'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <CONTEXT.Provider value={{token: ''}} >
    <App />
    </CONTEXT.Provider>
  </React.StrictMode>
)
