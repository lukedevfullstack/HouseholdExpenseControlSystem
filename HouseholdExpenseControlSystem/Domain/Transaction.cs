public class Transaction
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required, MaxLength(400)]
    public string Description { get; set; }
    
    [Range(0.01, double.MaxValue)]
    public decimal Value { get; set; }
    
    public TransactionType Type { get; set; } // Enum: Expense, Revenue
    
    public Guid PersonId { get; set; }
    public Person Person { get; set; }
    
    public Guid CategoryId { get; set; }
    public Category Category { get; set; }
}