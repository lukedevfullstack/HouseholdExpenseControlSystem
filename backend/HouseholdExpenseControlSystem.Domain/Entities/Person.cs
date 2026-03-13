using HouseholdExpenseControlSystem.Domain.Exceptions;

namespace HouseholdExpenseControlSystem.Domain.Entities;

public class Person
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public int Age { get; private set; }
    public ICollection<Transaction> Transactions { get; private set; } = new List<Transaction>();

    private Person() { } // Requisito do EF Core

    public Person(string name, int age)
    {
        if (string.IsNullOrWhiteSpace(name) || name.Length > 200)
            throw new DomainException("Nome é obrigatório e deve ter no máximo 200 caracteres.");
        if (age < 0)
            throw new DomainException("Idade não pode ser negativa.");

        Id = Guid.NewGuid();
        Name = name;
        Age = age;
    }

    public void Update(string name, int age)
    {
        // Lógica de edição
        Name = name;
        Age = age;
    }
}
