# 💈 Barbershop Booking App

Um aplicativo moderno para agendamento de serviços em barbearias, desenvolvido com Next.js, Prisma e PostgreSQL.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Executando o Projeto](#executando-o-projeto)
- [Contribuindo](#contribuindo)

## 🚀 Sobre o Projeto

O **Barbershop Booking App** é uma plataforma completa que permite aos usuários encontrar, visualizar e agendar serviços em diferentes barbearias. O sistema oferece uma interface moderna e intuitiva tanto para clientes quanto para estabelecimentos.

### Principais Benefícios

- **Para Clientes**: Encontre barbearias próximas, visualize serviços disponíveis, horários e faça agendamentos online
- **Para Barbearias**: Gerencie horários, serviços e receba reservas de forma organizada (Em breve)
- **Interface Moderna**: Design responsivo e experiência de usuário otimizada

## ✨ Funcionalidades

### 👤 Para Usuários
- [x] Autenticação via Google OAuth
- [x] Busca e filtro de barbearias
- [x] Visualização detalhada de serviços e preços
- [x] Sistema de agendamento de horários
- [x] Histórico de agendamentos
- [x] Interface responsiva (mobile-first)


### 🎨 Interface
- [x] Carrossel de barbearias populares
- [x] Grid layout responsivo
- [x] Componentes interativos
- [x] Feedback visual para ações do usuário

## 🛠 Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn UI** - Componentes pré estilizados
- **Lucide React** - Biblioteca de ícones moderna

### Backend
- **Next.js API Routes** - Endpoints serverless
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados relacional
- **NextAuth.js** - Autenticação e sessões

### DevOps & Tools
- **Docker** - Containerização da aplicação
- **ESLint** - Linting de código
- **Prettier** - Formatação de código

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18.0 ou superior)
- **npm** ou **yarn**
- **Git**
- **Docker** e **Docker Compose** (opcional, mas recomendado)

### Contas e APIs Necessárias

1. **Google Cloud Console**
   - Crie um projeto no [Google Cloud Console](https://console.cloud.google.com/)
   - Ative a Google API
   - Crie credenciais OAuth 2.0

2. **Banco de Dados PostgreSQL**
   - PostgreSQL local ou em nuvem (recomendado: Docker)
   - Ou use serviços como Supabase, Railway, Neon DB ou Vercel Postgres

## 🚀 Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/viitones/Barbershops.git
cd Barbershops
```

### 2. Instale as Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/barbershop_db"

# NextAuth.js
NEXTAUTH_SECRET="seu-secret-super-seguro-aqui"

# Google OAuth
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"



### 4. Obtenha as Credenciais do Google

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá para **APIs & Services > Credentials**
4. Clique em **Create Credentials > OAuth client ID**
5. Configure:
   - **Application type**: Web application
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
6. Copie o **Client ID** e **Client Secret** para o `.env`

## 🗄️ Configuração do Banco de Dados

### Opção 1: Docker (Recomendado)

Execute o PostgreSQL via Docker Compose:

```bash
docker compose up -d
```

O arquivo `docker-compose.yml` já está configurado com:
- PostgreSQL na porta 5432
- Volumes persistentes

### Opção 2: PostgreSQL Local

1. Instale o PostgreSQL localmente
2. Crie um banco de dados chamado `barbershop_db`
3. Configure a `DATABASE_URL` no `.env`

### Configuração do Prisma

Execute as migrações do banco de dados:

```bash
npx prisma migrate dev --name init-db
```

Popule o banco com dados iniciais:

```bash
npx prisma db seed
```

## 🎯 Executando o Projeto

### Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000)

### Comandos Úteis

```bash
# Executar em modo desenvolvimento
npm run dev

# Aplicar migrações do banco
npx prisma migrate dev --name 'your-migrate'

# Popular banco com dados de teste
npx prisma db seed

# Abrir Prisma Studio (interface visual do banco)
npx prisma studio

# Build para produção
npm run build
```

## 🐛 Solução de Problemas

### Problemas Comuns

**1. Erro de Conexão com o Banco**
```bash
# Verifique se o PostgreSQL está rodando
docker compose ps

# Recrie o container se necessário
docker compose down && docker compose up -d
```

**2. Erro nas Migrações do Prisma**
```bash
# Resete o banco (CUIDADO: apaga todos os dados)
npx prisma migrate reset

# Aplique as migrações novamente e popule o banco
npx prisma migrate dev --name init-db
npx prisma db seed
```

**3. Erro de Autenticação Google**
- Verifique se as credenciais estão corretas no `.env`
- Confirme se a URL de callback está configurada no Google Console

**4. Problema com TypeScript**
```bash
# Regenere os tipos do Prisma
npx prisma generate

# Limpe o cache do Next.js
rm -rf .next
npm run build
```

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

⭐ **Se este projeto te ajudou, deixe uma star no repositório!**

Para dúvidas ou suporte, abra uma [issue](https://github.com/seu-usuario/barbershop-booking-app/issues) ou entre em contato.
```
