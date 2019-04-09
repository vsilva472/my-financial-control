# My Financial Control
"MFC" é um  web aplicativo super simples para controle financeiro, indicado para os seguinte nichos:
 * Pessoas comuns que queiram controlar seus gastos.
 * Profissionais liberais com abaixa movimentação $$$ mensal como barbeiros, manicures, mecânicos e etc..

## A quem se destina
MFC foi desenvolvido para acelerar o desenvolvimento de web apps com esse tema, podendo ser facilmente empacotado em aplicação híbridas com cordova, ionic e etc..

## Tecnologias utilizadas
MFC foi desenvolvido em HTML5, CSS3, AngujarJS, Angualar Material, moment.js e WebSql para armazenamento de dados.

## Funcionalidades
### 1. Favoritos/Catálogo 
![Catálogo](https://www.materialui.co/materialIcons/communication/import_contacts_black_24x24.png) Usuário pode criar uma lista com os produtos ou gasto mais recorrentes para facilitar o lançamento durante o dia-a-dia

### 2. Lançamento de entrada/saída 
Funcionalidade principal do app lançamentos de registro de entrada/saída de dinheiro.

### 3. Filtro de lançamentos por data
![Filtro por range de data](https://www.materialui.co/materialIcons/action/date_range_black_24x24.png) Abre um popup para selecionar os lançamentos por um range de datas.

NOTA: Sempre que você entrar no app o período default será a data corrente.

## Configurações

### 1. Data Core/date.config.js

O compomente datepicker está configurado para o formato "DD/MM/YYYY", altere este padrão para o formato desejado.

### 2. Banco de Dados Database/database.config.js
* **lskey** - Nome da flag que o app utiliza para checar se deverá criar as tabelas ou não (salva no localstorage), então você desejar implementar um sistema de RESET em seu app basta remover esta propriedade do localstorage `window.localstorage.removeItem( DATABASE.lskey );` e atualizar a página;
* **version** - Versão do banco de dados. Necessário para abrir o websql
* **dbname** - Nome do banco de dados. Necessário para abrir o websql
* **description** - Texto que descreve o banco de dados . Necessário para abrir o websql
* **size** - Tamanho do banco de dados em bytes
* **schemas** - Sql das Tabelas a serem criadas. Se você deseja criar novas tabelas, basta incrementar esse objeto.
* **itemsPerPage** - Quantidade de itens por página. Utilizada na paginação 
* **seed** - Caso não deseje que o banco de dados seje populado sete a valor para false default : true.

### 3. Camadas de acesso a dados
* Database/database.service.js - Abre a conexão com o banco de dados e retorna o handler;
* Entry/entry.service.js - DAO para os lançamentos de registros de entrada/saída de dinheiro; 
* Catalog/catalog.service.js - DAO para registros dos itens mais utilizados. 

Nota: Se você deseja implementar outro tipo de storage como IndexedDB ou mesmo usar algum plugin para acesso SQLite do dispositivo, são esses os arquivos que você deve alterar. 

### Demo
Para visualizar a demonstração acesse: http://vsilva472.github.io/my-financial-control em um navegador que ainda tenha suporte WebSQL (como o Google Chrome por exemplo).

### Doações
Contribua para o projeto me enviando algumas **HTMLCOIN**  
Carteira: **HqgaiK6T1o2JP4p3p34CZp2g3XnSsSdCXp**
  
![Doar HTMLCoin](https://www.viniciusdesouza.com.br/img/htmlcoin.png)

#### Licença
MIT
