using HouseholdExpenseControlSystem.Domain.Entities;

namespace HouseholdExpenseControlSystem.Tests;

public class TransactionTests
{
    [Fact]
    public void Should_Throw_Error_When_Minor_Tries_Revenue()
    {
        // Arrange
        var age = 15;
        var type = "Receita";

        // Act & Assert
        Assert.Throws<InvalidOperationException>(() =>
            Transaction.Create("Job", 100, type, Guid.NewGuid(), Guid.NewGuid(), age, "Receita")
        );
    }
}