# Task Manager App

Este é um aplicativo de gerenciamento de tarefas desenvolvido com **React Native** utilizando **TypeScript**. O projeto permite aos usuários adicionar, visualizar, marcar como concluídas e excluir tarefas de forma simples e organizada.

## Funcionalidades

- Adicionar novas tarefas com título e descrição
- Visualizar detalhes de cada tarefa
- Marcar tarefas como concluídas
- Excluir múltiplas tarefas selecionadas
- Filtrar tarefas por status: todas, concluídas e não concluídas
- Interface visual com imagem de fundo e design escuro

## Tecnologias Utilizadas

- **React Native**
- **TypeScript**
- **Expo**
- **React Navigation** (`@react-navigation/native`, `@react-navigation/native-stack`)
- **React Native Picker** (`@react-native-picker/picker`)
- **React Native Vector Icons** (`@expo/vector-icons`)

## Estrutura do Projeto

- `App.tsx`: configura a navegação entre as telas
- `screens/Home.tsx`: exibe a lista de tarefas e ações principais
- `screens/AddTask.tsx`: permite adicionar novas tarefas
- `screens/Details.tsx`: mostra os detalhes da tarefa selecionada
- `components/CardTask.tsx`: componente visual reutilizável para listar tarefas

## Como Instalar

1. Clone o repositório:

   ```bash
   git clone https://github.com/GustavoTavaresDosSantos/to-do-list.git
   cd to-do-list
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

   ou, se estiver utilizando Yarn:

   ```bash
   yarn
   ```

3. Instale os pacotes nativos com Expo:

   ```bash
   npx expo install react-native-screens react-native-safe-area-context
   npx expo install @react-navigation/native @react-navigation/native-stack
   npx expo install @expo/vector-icons
   npm install @react-native-picker/picker
   ```

4. Inicie o projeto:

   ```bash
   npx expo start
   ```

## Requisitos

- Node.js (versão recomendada: LTS)

- Expo CLI instalado globalmente:

  ```bash
  npm install -g expo-cli
  ```

- Emulador Android/iOS ou aplicativo Expo Go no celular
