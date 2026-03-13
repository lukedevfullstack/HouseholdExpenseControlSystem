using HouseholdExpenseControlSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HouseholdExpenseControlSystem.Infrastructure.Mappings;

public class PersonMap : IEntityTypeConfiguration<Person>
{
    public void Configure(EntityTypeBuilder<Person> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(200).IsRequired();

        // Cascade Delete configurado explicitamente
        builder.HasMany(x => x.Transactions)
               .WithOne(t => t.Person)
               .HasForeignKey(t => t.PersonId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
