namespace HOUSEHOLDEXPENSECONTROLSYSTEM.Models;

public class Person
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    // Relacionamento (Um para Muitos)
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}