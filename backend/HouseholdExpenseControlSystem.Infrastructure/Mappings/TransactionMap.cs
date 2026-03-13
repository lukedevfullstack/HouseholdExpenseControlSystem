using HouseholdExpenseControlSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HouseholdExpenseControlSystem.Infrastructure.Mappings;

public class TransactionMap : IEntityTypeConfiguration<Transaction>
{
    public void Configure(EntityTypeBuilder<Transaction> builder)
    {
        builder.ToTable("Transactions");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Description).HasMaxLength(400).IsRequired();
        builder.Property(t => t.Value).HasColumnType("decimal(18,2)").IsRequired();
        builder.Property(t => t.Type).IsRequired();

        builder.HasOne(t => t.Category)
               .WithMany()
               .HasForeignKey(t => t.CategoryId)
               .OnDelete(DeleteBehavior.Restrict); // Não apaga categoria se houver transação
    }
}