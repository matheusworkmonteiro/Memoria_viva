# Memória Viva — aplicativo web (protótipo escolar)

## Como executar no Visual Studio Code
1. Extraia o ZIP e abra a pasta `memoria-viva-app` no VS Code.
2. Instale a extensão **Live Server** (opcional).
3. Clique com o botão direito no arquivo `index.html` > **Open with Live Server**.
4. Também é possível abrir diretamente o `index.html` em um navegador atualizado.
5. Para visualizar como celular: F12 > ícone de dispositivo (responsividade).

## Arquivos
- `index.html`: estrutura do aplicativo e navegação.
- `styles.css`: identidade visual em amarelo e roxo, otimizada para celular.
- `dados.js`: biblioteca controlada de respostas educativas e fontes.
- `app.js`: telas, mascote em SVG, jogos, chatbot e armazenamento local.

## Funcionalidades implementadas
- Dashboard e navegação por telas.
- Mascote ilustrado em SVG e design responsivo.
- Chatbot de pesquisa por palavras-chave com respostas limitadas ao arquivo `dados.js` e URLs de referência. **Não usa IA generativa, API nem RAG ainda.**
- Jogos funcionais: pares, cores, sequências numéricas (sem tempo limite).
- Agenda com inclusão, conclusão e exclusão de tarefas. **Sem notificações ou alarmes.**
- Diário do cuidador e perfil de interesses.
- Álbum local com até seis fotos compactadas, sujeito ao limite de armazenamento do navegador.
- Biblioteca de fontes e orientações gerais.

## Segurança e confiabilidade
Este é um **protótipo educacional, não validado clinicamente**. Conteúdos precisam de revisão por especialistas antes de qualquer uso público. O chatbot não diagnostica, não prevê evolução clínica e não modifica prescrições. Não inserir dados pessoais reais de pacientes na apresentação escolar.

Os dados são salvos apenas em `localStorage` do navegador e não estão criptografados; isso **não é apropriado para guardar informações reais de saúde de terceiros**. Para uso real, seria necessário backend seguro, autenticação, consentimento, controle de acesso, adequação à LGPD, revisão dos conteúdos, acessibilidade e testes de usabilidade.

## Próxima etapa — chatbot com IA
Para integrar IA de verdade será necessário: backend protegido para chave de API, biblioteca científica versionada e validada, busca RAG com citações, filtros de segurança, testes contra alucinações e tratamento de perguntas emergenciais. Não exponha uma chave de API no JavaScript do navegador.

## Ideias de avaliação científica
Testar navegação e compreensão com adultos voluntários usando dados fictícios. Coletar feedback sobre legibilidade, botões, clareza das fontes e facilidade de encontrar recursos; seguir orientação escolar e ética de pesquisa antes de recrutar participantes.
