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
}