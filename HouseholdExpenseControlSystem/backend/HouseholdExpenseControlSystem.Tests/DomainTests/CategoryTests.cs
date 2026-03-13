using HouseholdExpenseControlSystem.Domain.Entities;
using HouseholdExpenseControlSystem.Domain.Exceptions;

namespace HouseholdExpenseControlSystem.Tests.DomainTests;

public class CategoryTests
{
    [Theory]
    [InlineData("Receita")]
    [InlineData("Despesa")]
    [InlineData("Ambas")]
    public void Create_ShouldAcceptValidPurposes(string purpose)
    {
        // Act
        var category = new Category("Teste", purpose);

        // Assert
        Assert.Equal(purpose, category.Purpose);
    }

    [Fact]
    public void Create_ShouldThrowException_WhenDescriptionIsEmpty()
    {
        // Se sua entidade Category tiver essa validação:
        Assert.Throws<DomainException>(() => new Category("", "Receita"));
    }
}