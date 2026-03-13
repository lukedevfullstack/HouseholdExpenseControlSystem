using FluentAssertions;
using HouseholdExpenseControlSystem.Application.DTOs;
using HouseholdExpenseControlSystem.Application.Services;
using HouseholdExpenseControlSystem.Domain.Entities;
using HouseholdExpenseControlSystem.Infrastructure.Interfaces;
using Moq;

namespace HouseholdExpenseControlSystem.Tests.ApplicationTests;

public class CategoryServiceTests
{
    private readonly Mock<ICategoryRepository> _categoryRepoMock;
    private readonly CategoryService _service;

    public CategoryServiceTests()
    {
        _categoryRepoMock = new Mock<ICategoryRepository>();
        _service = new CategoryService(_categoryRepoMock.Object);
    }

    [Fact]
    public async Task CreateAsync_ShouldReturnResponse_WhenValid()
    {
        // Arrange
        var request = new CategoryRequest("Aluguel", "Despesa");

        // Act
        var result = await _service.CreateAsync(request);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Aluguel", result.Description);
        _categoryRepoMock.Verify(r => r.AddAsync(It.IsAny<Category>()), Times.Once);
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnList()
    {
        // Arrange
        var list = new List<Category> { new Category("Lazer", "Ambas") };
        _categoryRepoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(list);

        // Act
        var result = await _service.GetAllAsync();

        // Assert
        Assert.Single(result);
        Assert.Equal("Lazer", result.First().Description);
    }

    [Fact]
    public async Task GetCategoryTotalsAsync_ShouldCalculateTotalsAndBalanceCorrectly()
    {
        // Arrange
        var categoryId = Guid.NewGuid();
        var personId = Guid.NewGuid();

        var category = new Category("Alimentação", "Ambas");

        var t1 = Transaction.Create("Salário", 1000m, "Receita", personId, categoryId, 25, "Ambas");
        var t2 = Transaction.Create("Almoço", 200m, "Despesa", personId, categoryId, 25, "Ambas");

        category.Transactions = new List<Transaction> { t1, t2 };

        _categoryRepoMock.Setup(repo => repo.GetAllWithTransactionsAsync())
                       .ReturnsAsync(new List<Category> { category });

        // Act
        var result = await _service.GetCategoryTotalsAsync();

        // Assert
        result.GrandTotalBalance.Should().Be(800m);
    }

    [Fact]
    public async Task GetCategoryTotalsAsync_WhenNoTransactions_ShouldReturnZero()
    {
        // Arrange
        var category = new Category("Lazer", "Despesa");
        category.Transactions = new List<Transaction>();

        _categoryRepoMock.Setup(repo => repo.GetAllWithTransactionsAsync())
                       .ReturnsAsync(new List<Category> { category });

        // Act
        var result = await _service.GetCategoryTotalsAsync();

        // Assert
        result.GrandTotalBalance.Should().Be(0);
    }
}