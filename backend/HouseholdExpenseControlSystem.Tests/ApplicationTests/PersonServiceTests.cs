using HouseholdExpenseControlSystem.Application.Services;
using HouseholdExpenseControlSystem.Domain.Entities;
using HouseholdExpenseControlSystem.Infrastructure.Interfaces;
using Moq;

namespace HouseholdExpenseControlSystem.Tests.ApplicationTests;

public class PersonServiceTests
{
    private readonly Mock<IPersonRepository> _personRepoMock;
    private readonly Mock<ITransactionRepository> _transRepoMock;
    private readonly PersonService _service;

    public PersonServiceTests()
    {
        _personRepoMock = new Mock<IPersonRepository>();
        _transRepoMock = new Mock<ITransactionRepository>();
        _service = new PersonService(_personRepoMock.Object, _transRepoMock.Object);
    }

    [Fact]
    public async Task GetTotalsAsync_ShouldReturnCorrectBalance()
    {
        // Arrange
        var personId = Guid.NewGuid();
        var person = new Person("Lucas", 25);
        var transactions = new List<Transaction>
        {
            // Simulação de dados (Assumindo a assinatura do seu Create)
            Transaction.Create("Ganho", 2000, "Receita", personId, Guid.NewGuid(), 25, "Receita"),
            Transaction.Create("Gasto", 800, "Despesa", personId, Guid.NewGuid(), 25, "Despesa")
        };

        _personRepoMock.Setup(r => r.GetByIdAsync(personId)).ReturnsAsync(person);
        _transRepoMock.Setup(r => r.GetByPersonIdAsync(personId)).ReturnsAsync(transactions);

        // Act
        var result = await _service.GetTotalsAsync(personId);

        // Assert
        Assert.Equal(2000, result.TotalRecipes);
        Assert.Equal(800, result.TotalExpenses);
        Assert.Equal(1200, result.Balance);
    }
}