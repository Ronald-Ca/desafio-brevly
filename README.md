Brev.ly - Encurtador de URLs 🔗
Este repositório contém a solução completa para o Desafio Fase 1 da Rocketseat, com a implementação de um sistema FullStack de encurtador de links.

📌 O que foi desenvolvido
O Brev.ly é uma aplicação completa com as seguintes funcionalidades:

🔧 Backend (/server)
API REST construída com Fastify e TypeScript;

Integração com banco de dados usando Drizzle ORM;

Geração de links encurtados e redirecionamento para o link original;

Contagem de acessos por link;

Upload e armazenamento de dados com Cloudflare R2;

Suporte a variáveis de ambiente com .env;

💻 Frontend (/web)
Interface desenvolvida com React, TypeScript e Vite;

Estilização com CSS Modules;

Cadastro, listagem e exclusão de links;

Redirecionamento automático ao acessar um link encurtado;

Paginação, filtros e feedbacks com toast;

Integração com a API backend via Axios;

Gerenciamento de estado com Jotai e React Query;

📁 Estrutura do repositório

- web/      # Aplicação Frontend
- server/   # API Backend + Configurações DevOps
