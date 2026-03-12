namespace HOUSEHOLDEXPENSECONTROLSYSTEM.Models;

public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Description { get; set; } = string.Empty;
    public string Purpose { get; set; } = string.Empty; // "Receita", "Despesa" ou "Ambas"
}