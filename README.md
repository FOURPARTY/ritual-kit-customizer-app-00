
# Ebo Ayo - Plataforma de Produtos Rituais Sagrados

**URL do Projeto**: https://lovable.dev/projects/217037ef-0ff7-4698-b2b3-457c8e4b289f

## Sobre o Projeto

O Ebo Ayo é uma plataforma digital completa para comercialização de produtos rituais e sagrados, oferecendo desde ingredientes individuais até kits personalizáveis para rituais específicos. O projeto segue uma arquitetura moderna e segura usando Vite + React no frontend e Supabase Edge Functions no backend.

## Arquitetura do Sistema

### Frontend
- **React 18** com TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes UI
- **React Router** para navegação

### Backend
- **Supabase** como BaaS (Backend as a Service)
- **Supabase Edge Functions** para lógica de negócio
- **PostgreSQL** como banco de dados
- **Row Level Security (RLS)** para segurança

### Estrutura de Dados

#### Tabelas Principais:
- `products` - Catálogo de produtos
- `orders` - Pedidos dos usuários
- `order_items` - Itens dos pedidos
- `profiles` - Perfis de usuário

## Funcionalidades Implementadas

### ✅ Fase 1 - Fundação (Concluída)
- [x] Estrutura base do projeto
- [x] Configuração do Supabase
- [x] Edge Function `get-products`
- [x] Hook `useProducts` para consumir a API
- [x] Exibição de produtos reais do banco de dados
- [x] Refatoração do componente Index em componentes menores

### 🚧 Roadmap de Desenvolvimento

#### Etapa 1: Autenticação Real de Usuários
**Objetivo**: Implementar sistema completo de login, cadastro e gerenciamento de sessão

**Componentes a Implementar**:
- `AuthContext` - Context para gerenciar estado de autenticação
- `AuthProvider` - Provider para disponibilizar dados de auth
- Formulários de Login e Cadastro funcionais
- Database Trigger para criação automática de perfis

**Edge Functions**:
- Autenticação será feita diretamente no frontend via Supabase Auth

**Instruções Técnicas**:
```typescript
// Cadastro
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name: name,
      ile_axe_name: ileAxeName,
      baba_iya_name: babaIyaName
    }
  }
});

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
});
```

#### Etapa 2: Carrinho de Compras
**Objetivo**: Sistema de carrinho funcional com persistência local

**Componentes a Implementar**:
- `CartContext` - Context para gerenciar estado do carrinho
- `CartProvider` - Provider para disponibilizar funções do carrinho
- Persistência via `localStorage`

**Funcionalidades**:
- Adicionar/remover itens
- Atualizar quantidades
- Calcular totais
- Persistir estado entre sessões

#### Etapa 3: Finalização de Pedidos
**Objetivo**: Transformar carrinho em pedidos seguros no banco de dados

**Edge Functions a Criar**:
- `create-order` - Função protegida para criar pedidos

**Funcionalidades**:
- Autenticação obrigatória
- Validação de preços no servidor
- Criação transacional de pedidos
- Segurança contra fraudes

```typescript
// Estrutura da função create-order
const createOrder = async (cartItems, userToken) => {
  // 1. Validar autenticação
  // 2. Buscar preços reais do banco
  // 3. Calcular total no servidor
  // 4. Criar pedido + itens em transação
  // 5. Retornar confirmação
};
```

#### Etapa 4: Histórico de Pedidos
**Objetivo**: Painel para acompanhar pedidos realizados

**Edge Functions a Criar**:
- `get-orders` - Função protegida para buscar pedidos do usuário

**Componentes a Implementar**:
- Página "Meus Pedidos"
- Componente de rastreamento
- Status de pedidos em tempo real

## Estrutura de Arquivos

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes shadcn/ui
│   ├── HeroSection.tsx  # Seção hero da home
│   ├── FeaturedProducts.tsx
│   ├── CategoriesSection.tsx
│   └── FeaturesSection.tsx
├── hooks/               # Custom hooks
│   └── useProducts.ts   # Hook para buscar produtos
├── pages/               # Páginas da aplicação
│   └── Index.tsx        # Página principal (refatorada)
├── types/               # Definições de tipos TypeScript
│   └── index.ts         # Tipos globais
├── integrations/        # Integrações externas
│   └── supabase/        # Configuração Supabase
└── lib/                 # Utilitários

supabase/
├── functions/           # Edge Functions
│   ├── _shared/         # Código compartilhado
│   │   └── cors.ts      # Headers CORS
│   └── get-products/    # Função para buscar produtos
│       └── index.ts
└── config.toml         # Configuração do projeto
```

## Como Desenvolver

### Pré-requisitos
- Node.js & npm
- Conta Supabase
- CLI do Supabase (para Edge Functions)

### Configuração Local
```bash
# 1. Clone o repositório
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Instale dependências
npm i

# 3. Configure Supabase
npx supabase login
npx supabase init

# 4. Inicie o desenvolvimento
npm run dev
```

### Trabalhando com Edge Functions
```bash
# Criar nova função
npx supabase functions new nome-da-funcao

# Servir localmente
npx supabase functions serve

# Deploy
npx supabase functions deploy nome-da-funcao
```

## Segurança e Boas Práticas

### Edge Functions
- Sempre usar CORS headers apropriados
- Validar autenticação quando necessário
- Nunca confiar em dados do frontend para cálculos críticos
- Usar service_role_key apenas no servidor

### Frontend
- Usar apenas anon_key no cliente
- Implementar tratamento de erros adequado
- Validar dados de entrada
- Usar TypeScript para type safety

## Tecnologias Utilizadas

- **Vite** - Build tool e dev server
- **React 18** - Library de UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones
- **React Router** - Roteamento
- **Supabase** - Backend as a Service
- **PostgreSQL** - Banco de dados

## Status do Projeto

- ✅ **Fundação**: Estrutura base e conexão com backend
- 🔄 **Em Desenvolvimento**: Autenticação e carrinho
- ⏳ **Próximas Etapas**: Finalização de pedidos e histórico

## Contribuindo

Para contribuir com o projeto:

1. Use a [interface Lovable](https://lovable.dev/projects/217037ef-0ff7-4698-b2b3-457c8e4b289f)
2. Ou clone localmente e faça push das alterações
3. Siga as convenções de código estabelecidas
4. Mantenha a documentação atualizada

## Deploy

Para fazer deploy da aplicação:
1. Acesse [Lovable](https://lovable.dev/projects/217037ef-0ff7-4698-b2b3-457c8e4b289f)
2. Clique em Share → Publish
3. Configure domínio customizado se necessário

---

**Axé!** 🙏 Que este projeto traga luz e prosperidade para todos que o utilizarem.
