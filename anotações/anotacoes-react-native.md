# Anotações de Aprendizado – React Native (09/06/2025)

## Componentes Utilizados

- **View**: Contêiner básico para layout, similar a uma `<div>` no HTML.
- **Text**: Exibe textos na interface.
- **Image**: Utilizada para carregar imagens locais ou remotas.
- **Button**: Botão com aparência nativa do sistema.
- **TouchableOpacity**: Botão personalizável que oferece feedback visual ao toque.
- **Alert**: Responsável por exibir diálogos nativos do sistema.

## Estilização

- Utilizado `StyleSheet.create()` para centralizar os estilos.
- Propriedades aplicadas:
  - `fontSize`, `fontWeight`, `backgroundColor`, `padding`, `margin`
  - `alignItems`, `justifyContent`, `borderRadius`, entre outros.
- Mantida separação clara entre lógica e aparência para organização do código.

## Componentização

- **Saudacao.js**: Componente funcional simples que retorna um texto.
- **Card.js**: Componente com layout próprio, estilizado com bordas arredondadas e cor de fundo.

## Interações

- `onPress` usado em `Button` e `TouchableOpacity` para capturar eventos de toque.
- Alertas exibidos com `Alert.alert()` como resposta à interação do usuário.

## Imagens

- Implementadas duas abordagens:
  - Imagem remota (via `uri`).
  - Imagem local (via `require()`).

## Organização do Projeto

- Componentes mantidos em arquivos separados.
- Nomeação clara de funções e estilos.
- Layout com alinhamento e espaçamento adequados (`flex`, `padding`, `margin`).

## Próximos Tópicos a Estudar

- Navegação com **React Navigation**
- Entrada de dados com **TextInput**
- Exibição de listas com **FlatList** e **ScrollView**
- Manipulação de estado com **Hooks** (`useState`, `useEffect`)
- Consumo de APIs e armazenamento local (ex: AsyncStorage)
