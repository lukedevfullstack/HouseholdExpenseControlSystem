using HouseholdExpenseControlSystem.Domain.Entities;

namespace HouseholdExpenseControlSystem.Infrastructure.Interfaces;

public interface ICategoryRepository
{
    Task<Category?> GetByIdAsync(Guid id);
    Task<IEnumerable<Category>> GetAllAsync();
    Task AddAsync(Category category);
}