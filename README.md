# MooD - Diário de Humor

<div align="center">
  <p><em>O seu diário de humor seguro, focado em privacidade absoluta e arquitetura zero-knowledge.</em></p>

  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
</div>

---

## 📊 Sobre o Projeto

O **MooD** é uma aplicação web progressiva (PWA) desenvolvida para o registro e acompanhamento diário de humor, rotina e sono. A aplicação foi desenhada com foco estrito em segurança e privacidade, garantindo que o usuário tenha total controle sobre seus dados por meio de criptografia no lado do cliente antes de qualquer sincronização com o banco de dados.

## ✨ Funcionalidades Principais

*   **Arquitetura Zero-Knowledge & Segurança:** Sistema de proteção baseado em uma *Master Key* local. Os dados são encriptados e bloqueados na interface, garantindo que o conteúdo do diário fique inacessível caso a sessão seja fechada ou a senha incorreta seja fornecida. Um estado de segurança ("Access Locked") oculta os dados e força o logout ou reautenticação em caso de violação.
*   **Gestão Completa de Registros (CRUD):** Interface otimizada para criar, ler, atualizar e excluir registros de humor diários, com modais dedicados para entrada de dados e visualização de detalhes do histórico.
*   **Cálculo Dinâmico de Sono:** O sistema processa automaticamente a duração total do sono (cruzando a meia-noite, se necessário) com base nos horários de deitar e acordar informados. O cálculo é exibido em tempo real no formulário e na listagem do histórico, sem a necessidade de gravar dados redundantes no banco.
*   **Backup Encriptado & Restauração:** Funcionalidade nativa para exportar todos os registros em um arquivo de backup totalmente criptografado. O sistema inclui a opção de fazer o upload desse arquivo para importar e restaurar o histórico de forma segura em qualquer outro dispositivo, mantendo a integridade e privacidade dos dados.
*   **Pesquisa Dinâmica:** Sistema de busca e filtragem avançada que permite localizar registros específicos no histórico de forma instantânea, utilizando palavras-chave, anotações ou detalhes específicos preenchidos no diário.
*   **Experiência PWA Nativa e Suporte Offline:** A aplicação é instalável (WebAPK) em dispositivos móveis. Utiliza Service Workers com a estratégia *Cache First* para garantir carregamento instantâneo, visualização do histórico e uso da interface mesmo sem conexão à internet.
*   **Feedback Auditivo Integrado (Web Audio API):** Respostas sonoras sintetizadas nativamente no navegador para melhorar a usabilidade e acessibilidade, incluindo:
    *   Confirmação de sucesso ao salvar registros.
    *   Alertas de erro em falhas de validação ou de senha.
    *   Efeito estéreo espacial (panoramic) ao excluir dados.

## 🛠️ Tecnologias Utilizadas

*   **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS.
*   **Áudio e UX:** Web Audio API (geração de frequências e osciladores em tempo real sem arquivos externos).
*   **Infraestrutura:** Firebase Hosting e Firebase Authentication.
*   **DevOps:** GitHub Actions, Docker (para ambientes de desenvolvimento isolados).