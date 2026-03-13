using HouseholdExpenseControlSystem.Domain.Entities;
using HouseholdExpenseControlSystem.Domain.Exceptions; 

namespace HouseholdExpenseControlSystem.Tests.DomainTests;

public class TransactionTests
{
    [Fact]
    public void Create_ShouldThrowException_WhenMinorHasRevenue()
    {
        // Arrange
        var personId = Guid.NewGuid();
        var catId = Guid.NewGuid();

        // Act & Assert
        var ex = Assert.Throws<DomainException>(() =>
            Transaction.Create("Salário", 100, "Receita", personId, catId, 17, "Receita"));

        Assert.Equal("Menores de idade só podem registrar despesas.", ex.Message);
    }

    [Fact]
    public void Create_ShouldThrowException_WhenCategoryPurposeMismatch()
    {
        // Arrange
        var personId = Guid.NewGuid();
        var catId = Guid.NewGuid();

        // Act & Assert (Tentando lançar Despesa em categoria de Receita)
        var ex = Assert.Throws<DomainException>(() =>
            Transaction.Create("Aluguel", 500, "Despesa", personId, catId, 25, "Receita"));

        Assert.Contains("Categoria incompatível com o tipo de transação", ex.Message);
    }
}