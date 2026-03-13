# 🏠 Household Expense Control System

Sistema de controle de gastos residenciais desenvolvido com **ASP.NET Core 9**, seguindo os princípios da **Clean Architecture** e **DDD (Domain Driven Design)**.

---

## 🚀 Tecnologias Utilizadas

* **Backend:** .NET 9 (C#)
* **Banco de Dados:** SQLite (com Entity Framework Core)
* **Testes:** xUnit & Moq
* **Documentação:** Swagger (OpenAPI)
* **Arquitetura:** Clean Architecture (Separação por camadas)

---

## 🏗️ Arquitetura do Projeto

O projeto foi estruturado para garantir a separação de responsabilidades e a testabilidade:

* **Domain:** Contém as entidades puras, interfaces de repositório e as regras de negócio (Validação de idade e categorias).
* **Application:** Responsável pelos DTOs (Data Transfer Objects) e Serviços que executam a lógica de cálculo de saldos.
* **Infrastructure:** Implementação do DataContext, Repositórios e configurações do SQLite.
* **WebAPI:** Controladores que expõem os endpoints da aplicação.
* **Tests:** Suíte de testes unitários para Domínio e Aplicação.

---

## 🛠️ Como Executar o Projeto

### 1. Pré-requisitos
* [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0) instalado.

### 2. Passo a Passo
No terminal, na pasta raiz da solução:

```bash
# Restaurar dependências
dotnet restore

# Navegar até o projeto da WebAPI
cd src/HouseholdExpenseControlSystem.WebAPI

# Rodar a aplicação
dotnet run
```
## O Swagger estará disponível em: https://localhost:5001/swagger

Nota: O banco de dados SQLite (HouseholdExpense.db) é gerado automaticamente e já contém dados de exemplo (Seed) para Lucas (25 anos) e Joãozinho (10 anos).

### 🧪 Suíte de Testes
Para garantir a integridade das regras financeiras, execute os testes unitários:
# Na raiz do projeto
```
dotnet test
```

### Regras de Negócio Testadas:
Regra de Ouro: Bloqueio de receitas para menores de 18 anos.

Consistência: Impedimento de vincular uma despesa a uma categoria exclusiva de receita.

Cálculo: Verificação da fórmula Saldo = Receitas - Despesas.

### Regras de Negócio Testadas:
Regra de Ouro: Bloqueio de receitas para menores de 18 anos.

Consistência: Impedimento de vincular uma despesa a uma categoria exclusiva de receita.

Cálculo: Verificação da fórmula Saldo = Receitas - Despesas.

# Funções
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

