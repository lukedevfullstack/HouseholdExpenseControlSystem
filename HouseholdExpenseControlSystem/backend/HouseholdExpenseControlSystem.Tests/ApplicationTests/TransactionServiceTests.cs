using HouseholdExpenseControlSystem.Application.DTOs;
using HouseholdExpenseControlSystem.Domain.Entities;
using HouseholdExpenseControlSystem.Infrastructure.Interfaces;
using Moq;

namespace HouseholdExpenseControlSystem.Tests.Application;

public class TransactionServiceTests
{
    private readonly Mock<ITransactionRepository> _transRepoMock;
    private readonly Mock<IPersonRepository> _personRepoMock;
    private readonly Mock<ICategoryRepository> _categoryRepoMock;
    private readonly TransactionService _service;

    public TransactionServiceTests()
    {
        _transRepoMock = new Mock<ITransactionRepository>();
        _personRepoMock = new Mock<IPersonRepository>();
        _categoryRepoMock = new Mock<ICategoryRepository>();

        _service = new TransactionService(
            _transRepoMock.Object,
            _personRepoMock.Object,
            _categoryRepoMock.Object);
    }

    [Fact]
    public async Task CreateAsync_ShouldSaveTransaction_WhenValid()
    {
        // Arrange
        var person = new Person("Lucas", 25);
        var category = new Category("Aluguel", "Despesa");
        var request = new TransactionRequest("Pagamento", 500, "Despesa", person.Id, category.Id);

        _personRepoMock.Setup(r => r.GetByIdAsync(person.Id)).ReturnsAsync(person);
        _categoryRepoMock.Setup(r => r.GetByIdAsync(category.Id)).ReturnsAsync(category);

        // Act
        var result = await _service.CreateAsync(request);

        // Assert
        Assert.NotNull(result);
        _transRepoMock.Verify(r => r.AddAsync(It.IsAny<Transaction>()), Times.Once);
    }

    [Fact]
    public async Task CreateAsync_ShouldThrowException_WhenPersonNotFound()
    {
        // Arrange
        var requestId = Guid.NewGuid();
        _personRepoMock.Setup(r => r.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync((Person)null!);

        // Act & Assert
        // Alterado de Exception para DomainException
        var exception = await Assert.ThrowsAsync<HouseholdExpenseControlSystem.Domain.Exceptions.DomainException>(() =>
            _service.CreateAsync(new TransactionRequest("X", 10, "Receita", requestId, Guid.NewGuid())));

        Assert.Equal("Pessoa não encontrada.", exception.Message);
    }
}