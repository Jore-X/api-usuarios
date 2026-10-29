# API de Usuários
🌐 **Demonstração online:** [Acessar API](https://api-usuarios-sihq.onrender.com)

API REST desenvolvida com Node.js, Express e Supabase para gerenciamento de usuários, com operações CRUD e validação de dados.

## Tecnologias

- Node.js
- Express
- JavaScript (ES Modules)
- Supabase (PostgreSQL)

## Funcionalidades

- Listar usuários
- Buscar usuário por ID
- Cadastrar usuário
- Atualizar usuário
- Excluir usuário
- Validar dados recebidos
- Retornar códigos HTTP adequados para cada situação
- Consultar usuários publicamente, conforme as permissões configuradas no Supabase

## Requisitos

- Node.js instalado
- Projeto no Supabase
- Tabela `usuarios` configurada no banco de dados
- Row Level Security (RLS) ativado e políticas configuradas

## Configuração

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Jore-X/api-usuarios
cd api-usuarios
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_PUBLISHABLE_KEY=sua_chave_publica
PORT=3000
```

Substitua os valores pelos dados do seu projeto Supabase.

**Importante:** não compartilhe credenciais privadas. A chave pública pode ser usada no cliente, mas não substitui as políticas de segurança do banco. Mantenha o RLS ativado e configure somente as permissões necessárias.

## Executar a API

```bash
node server.js
```

Por padrão, a API ficará disponível em:

`http://localhost:3000`

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Verificar se a API está funcionando |
| GET | `/usuarios` | Listar usuários |
| GET | `/usuarios/:id` | Buscar usuário por ID |
| POST | `/usuarios` | Cadastrar usuário |
| PUT | `/usuarios/:id` | Atualizar usuário |
| DELETE | `/usuarios/:id` | Excluir usuário |

## Dados de demonstração

A API já possui alguns usuários cadastrados para facilitar os testes.

**Endpoint:** `GET /usuarios`

Exemplo de resposta:

```json
[
  {
    "id": 2,
    "name": "Maria Josephina",
    "created_at": "2026-10-29T04:56:21.810458+00:00"
  },
  {
    "id": 1,
    "name": "Carl Jhonson",
    "created_at": "2026-10-29T04:52:54.834753+00:00"
  },
  {
    "id": 6,
    "name": "Manoel",
    "created_at": "2026-10-29T18:16:20.57998+00:00"
  },
  {
    "id": 4,
    "name": "Joaquim Soares",
    "created_at": "2026-10-29T15:40:27.079904+00:00"
  }
]
```

Esses registros são apenas exemplos para visualizar o funcionamento da API. Os dados podem mudar conforme novos testes forem realizados.


### Exemplos de requisições

**Cadastrar usuário — `POST /usuarios`**

```json
{
  "name": "João"
}
```

**Buscar usuário — `GET /usuarios/1`**

Retorna o usuário correspondente ao ID informado.

**Atualizar usuário — `PUT /usuarios/1`**

```json
{
  "name": "João Silva"
}
```

**Excluir usuário — `DELETE /usuarios/1`**

Exclui o usuário correspondente, caso a operação esteja autorizada.

Para as requisições `POST` e `PUT`, envie o cabeçalho:

`Content-Type: application/json`

## Códigos HTTP

| Código | Significado |
|---|---|
| `200 OK` | Requisição concluída |
| `201 Created` | Usuário criado |
| `400 Bad Request` | Dados ou ID inválidos |
| `404 Not Found` | Usuário não encontrado |
| `500 Internal Server Error` | Erro interno ou no acesso ao banco |

## Segurança

O acesso aos dados é controlado pelas políticas de Row Level Security (RLS) do Supabase.

A consulta pública deve ser limitada aos dados destinados à demonstração. Operações de criação, atualização e exclusão não devem ficar disponíveis sem autorização adequada.

## Objetivo do projeto

Este projeto foi desenvolvido para praticar a criação de APIs REST, o uso de rotas HTTP, a validação de dados, a integração com banco de dados, o gerenciamento de variáveis de ambiente e o controle de versão com Git.