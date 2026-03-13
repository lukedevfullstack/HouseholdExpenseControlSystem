using HouseholdExpenseControlSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HouseholdExpenseControlSystem.Infrastructure.Mappings;

public class CategoryMap : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("Categories");
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Description)
            .HasMaxLength(400)
            .IsRequired();

        builder.Property(c => c.Purpose)
            .IsRequired(); // "Receita", "Despesa" ou "Ambas"
    }
}