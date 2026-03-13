using HouseholdExpenseControlSystem.Domain.Exceptions;

namespace HouseholdExpenseControlSystem.Domain.Entities;

public class Transaction
{
    public Guid Id { get; private set; }
    public string Description { get; private set; }
    public decimal Value { get; private set; }
    public string Type { get; private set; } // "Receita" ou "Despesa"
    public Guid PersonId { get; private set; }
    public Guid CategoryId { get; private set; }

    public virtual Person Person { get; private set; }
    public virtual Category Category { get; private set; }

    // Construtor privado para forçar o uso da Factory/Validação
    private Transaction() { }

    public static Transaction Create(string desc, decimal val, string type, Guid pId, Guid cId, int personAge, string categoryPurpose)
    {
        // Fail Fast Validation
        if (val <= 0) throw new DomainException("O valor deve ser positivo.");

        // Regra de Negócio: Menor de 18 não aceita Receita
        if (personAge < 18 && type == "Receita")
            throw new DomainException("Menores de idade só podem registrar despesas.");

        // Regra de Negócio: Compatibilidade de Categoria
        if (categoryPurpose != "Ambas" && categoryPurpose != type)
            throw new DomainException("Categoria incompatível com o tipo de transação.");

        return new Transaction
        {
            Id = Guid.NewGuid(),
            Description = desc,
            Value = val,
            Type = type,
            PersonId = pId,
            CategoryId = cId
        };
    }
}