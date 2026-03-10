# HouseholdExpenseControlSystem
## Implementar um sistema de controle de gastos residenciais.
### Cadastro de pessoas: 

- [x] Deverá ser implementado um cadastro contendo as funcionalidades básicas de gerenciamento: criação, edição, deleção e listagem.

- [x] Em casos que se delete uma pessoa, todas a transações dessa pessoa deverão ser apagadas.

### O cadastro de pessoa deverá conter:

- [x] Identificador (deve ser um valor único gerado automaticamente);
- [x] Nome (texto com tamanho máximo de 200);
- [x] Idade;


### Cadastro de categorias: 

- [x] Deverá ser implementado um cadastro contendo as funcionalidades básicas de gerenciamento: criação e listagem.

### O cadastro de categoria deverá conter:

- [x] Identificador (deve ser um valor único gerado automaticamente);
- [x] Descrição (texto com tamanho máximo de 400);
- [x] Finalidade (despesa/receita/ambas)


### Cadastro de transações: 

- [x] Deverá ser implementado um cadastro contendo as funcionalidades básicas de gerenciamento: criação e listagem.

- [x] Caso o usuário informe um menor de idade (menor de 18), apenas despesas deverão ser aceitas.

### O cadastro de transação deverá conter:

- [x] Identificador (deve ser um valor único gerado automaticamente);
- [x] Descrição (texto com tamanho máximo de 400);
- [x] Valor (número positivo);
- [x] Tipo (despesa/receita);
- [x] Categoria: restringir a utilização de categorias conforme o valor definido no campo finalidade. Ex.: se o tipo da transação é despesa, não poderá utilizar uma categoria que tenha a finalidade receita.
Pessoa (identificador da pessoa do cadastro anterior);


### Consulta de totais por pessoa:

- [x] Deverá listar todas as pessoas cadastradas, exibindo o total de receitas, despesas e o saldo (receita – despesa) de cada uma.

- [x] Ao final da listagem anterior, deverá exibir o total geral de todas as pessoas incluindo o total de receitas, total de despesas e o saldo líquido.

