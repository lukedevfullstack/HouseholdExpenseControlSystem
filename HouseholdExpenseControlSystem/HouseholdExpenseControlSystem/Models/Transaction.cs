namespace HOUSEHOLDEXPENSECONTROLSYSTEM.Models;

public class Transaction
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Description { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public string Type { get; set; } // "Receita" ou "Despesa"
    
    public Guid CategoryId { get; set; }
    public Category? Category { get; set; }
    
    public Guid PersonId { get; set; }
    public Person? Person { get; set; }
}