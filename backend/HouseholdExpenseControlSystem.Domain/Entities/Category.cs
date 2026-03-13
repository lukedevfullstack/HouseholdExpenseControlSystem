using HouseholdExpenseControlSystem.Domain.Exceptions;

namespace HouseholdExpenseControlSystem.Domain.Entities;
public class Category
{
    public Guid Id { get; private set; }
    public string Description { get; private set; }
    public string Purpose { get; private set; } // "Receita", "Despesa" ou "Ambas"

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();

    private Category() { }

    public Category(string description, string purpose)
    {
        if (string.IsNullOrWhiteSpace(description))
            throw new DomainException("A descrição da categoria não pode ser vazia.");

        if (purpose != "Receita" && purpose != "Despesa" && purpose != "Ambas")
            throw new DomainException("Finalidade da categoria inválida.");

        if (description.Length > 400) throw new DomainException("Descrição muito longa.");

        Id = Guid.NewGuid();
        Description = description;
        Purpose = purpose;
    }
}