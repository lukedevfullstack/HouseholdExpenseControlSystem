using Microsoft.EntityFrameworkCore;
using HOUSEHOLDEXPENSECONTROLSYSTEM.Models;

namespace HOUSEHOLDEXPENSECONTROLSYSTEM.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Person> Persons { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração da Entidade Person
            modelBuilder.Entity<Person>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Name).IsRequired().HasMaxLength(200);
                entity.Property(p => p.Age).IsRequired();

                // RELACIONAMENTO E DELEÇÃO EM CASCATA:
                // Quando uma Person é deletada, todas as suas Transactions são apagadas automaticamente.
                entity.HasMany(p => p.Transactions)
                      .WithOne(t => t.Person)
                      .HasForeignKey(t => t.PersonId)
                      .OnDelete(DeleteBehavior.Cascade); 
            });

            // Configuração da Entidade Category
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.Property(c => c.Description).IsRequired().HasMaxLength(400);
                entity.Property(c => c.Purpose).IsRequired(); // Despesa, Receita ou Ambas
            });

            // Configuração da Entidade Transaction
            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.HasKey(t => t.Id);
                entity.Property(t => t.Description).IsRequired().HasMaxLength(400);
                entity.Property(t => t.Value).HasColumnType("decimal(18,2)").IsRequired();
                entity.Property(t => t.Type).IsRequired(); // Despesa ou Receita

                // Relacionamento com Categoria (Restrição de integridade)
                entity.HasOne(t => t.Category)
                      .WithMany()
                      .HasForeignKey(t => t.CategoryId)
                      .OnDelete(DeleteBehavior.Restrict); // Não permite apagar categoria se houver transação
            });
        }

        internal async Task SaveChangesAsync()
        {
            throw new NotImplementedException();
        }
    }
}