# 🔎 Fetch GitHub API

Aplicação web que consome a API pública do GitHub para buscar informações de um usuário e exibir dados completos do perfil e seus repositórios.

A aplicação apresenta:

### 👤 Informações do Perfil
- 📸 Foto de perfil  
- 👤 Nome  
- 📝 Bio  
- 👥 Número de seguidores  
- 🔄 Número de usuários que está seguindo  

### 📦 Informações dos Repositórios (últimos 10)
- ⭐ Quantidade de estrelas  
- 🍴 Número de forks  
- 👁️ Número de watchers  
- 💻 Linguagem principal utilizada 

Projeto focado em consumo de API, manipulação de dados assíncronos e renderização dinâmica no DOM.

---

## 🖼️ Preview

![Preview do projeto](./src/images/fetch-github-api.gif)

---

## 🌐 Deploy

🔗 **Acesse online:**  
[Ver projeto funcionando](https://aline-mmiranda.github.io/project-fetch-github-api/)

---

## 🧠 Desafio Técnico

Este projeto teve como foco:

- Requisições HTTP utilizando `fetch`
- Uso de `async/await`
- Tratamento básico de erros
- Manipulação de objetos retornados pela API
- Renderização dinâmica no DOM
- Organização de fluxo da aplicação

Também foi necessário lidar com:

- Estrutura de dados complexa (arrays de repositórios)
- Limitação da quantidade exibida (top 10)
- Extração de métricas relevantes (forks, estrelas, linguagem)
- Validação de entrada do usuário

---

## 🛠️ Tecnologias Utilizadas

- HTML5  
- CSS3  
- JavaScript (ES6+)  
- GitHub REST API  

---

## 📊 Competências Demonstradas

✔ Consumo de API REST  
✔ Programação assíncrona com `async/await`  
✔ Manipulação de objetos e arrays complexos  
✔ Extração e organização de métricas  
✔ Estruturação de lógica condicional  
✔ Integração Front-End com dados externos   

---

## 🎯 Objetivo do Projeto

Consolidar conhecimentos em JavaScript moderno e integração com APIs reais, simulando um cenário prático de mercado onde dados externos precisam ser consumidos, tratados e exibidos de forma clara e organizada.

---

## ✨ Autora

**Aline M Miranda**  
Desenvolvedora Front-End em formação  

[![GitHub](https://img.shields.io/badge/-GitHub-000?style=flat-square&logo=github&logoColor=white)](https://github.com/aline-mmiranda)  
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aline-mmiranda)

---

## 📌 Próximos Passos

- Implementar loading state  
- Melhorar tratamento de erro (usuário inexistente)  
- Paginação de repositórios  
- Filtro por linguagem  
- Evoluir para versão com React  