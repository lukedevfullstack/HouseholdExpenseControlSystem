using HouseholdExpenseControlSystem.Domain.Exceptions;

namespace HouseholdExpenseControlSystem.Domain.Entities;
public class Category
{
    public Guid Id { get; private set; }
    public string Description { get; private set; }
    public string Purpose { get; private set; } // "Receita", "Despesa" ou "Ambas"

    private Category() { }

    public Category(string description, string purpose)
    {
        if (description.Length > 400) throw new DomainException("Descrição muito longa.");

        Id = Guid.NewGuid();
        Description = description;
        Purpose = purpose;
    }
}