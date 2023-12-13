# My Wallet

O app my wallet um sistema de controle
de gastos que permite aos usuários registrar suas despesas e receitas, com
uma descrição detalhada. O aplicativo atualiza automaticamente o saldo total,
realizando adições ou subtrações com base nas entradas dos usuários.

# Rotas

## Login ('/')

- Nesta página você pode fazer login com email e senha, se não possui pode Clicar em cadastre-se.

## Cadastro ('/cadastro')

- Nesta pagina você pode inserir os dados necessários para criar um usuário.

## Home ('/home')

- Vocês será direcinado à esta tela se fizer login com sucesso, nela voce pode acompanhar as transações que já foram feitas e seu saldo atual.

## Nova transação ('/nova-transacao/:tipoDeTransação')

- Se na pagina '/home' clicar em nova entrada ou saida será direcionado para essa página onde poderá inserir uma nova transação com uma descrição e o valor.

# Como rodar

- Baixe ou clone o repositório;
- Instale as dependências: npm i
- Execute o projeto: npm run dev

# Como rodar via docker

- Baixe a imagem: docker pull thiago21sousa21/my-wallet
- execute o run: docker run -d -e VITE_API_URL=https://projeto14-mywallet-back-gvuz.onrender.com/ -p 3000:80 thiago21sousa21/my-wallet
- Por padrão ele roda na porta 80;
- Você deve configurar uma variavel de ambiente VITE_API_URL para requisições, voce pode baixar a API em: https://github.com/Thiago21sousa21/projeto14-mywallet-back ou usar o link de deploy dela: https://projeto14-mywallet-back-gvuz.onrender.com/
