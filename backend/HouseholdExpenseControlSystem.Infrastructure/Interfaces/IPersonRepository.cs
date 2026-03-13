using HouseholdExpenseControlSystem.Domain.Entities;

namespace HouseholdExpenseControlSystem.Infrastructure.Interfaces;

public interface IPersonRepository
{
    Task<Person?> GetByIdAsync(Guid id);
    Task<IEnumerable<Person>> GetAllAsync();
    Task AddAsync(Person person);
    Task UpdateAsync(Person person);
    Task DeleteAsync(Guid id);
    Task<object> GetTotalsAsync(); // Para o relatório de saldos
    Task<IEnumerable<Person>> GetAllWithTransactionsAsync();
}
