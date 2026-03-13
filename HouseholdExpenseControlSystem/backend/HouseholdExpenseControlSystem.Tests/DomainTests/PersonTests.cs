using HouseholdExpenseControlSystem.Domain.Entities;
using HouseholdExpenseControlSystem.Domain.Exceptions;

namespace HouseholdExpenseControlSystem.Tests.DomainTests;

public class PersonTests
{
    [Fact]
    public void Create_ShouldAssignPropertiesCorrectly()
    {
        // Act
        var person = new Person("Lucas", 25);

        // Assert
        Assert.Equal("Lucas", person.Name);
        Assert.Equal(25, person.Age);
        Assert.NotEqual(Guid.Empty, person.Id);
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public void Create_ShouldThrowException_WhenNameIsInvalid(string name)
    {
        // Se houver validação no construtor da Person
        Assert.Throws<DomainException>(() => new Person(name, 25));
    }
}