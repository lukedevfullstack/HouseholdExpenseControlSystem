using HouseholdExpenseControlSystem.Domain.Entities;
using HouseholdExpenseControlSystem.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenseControlSystem.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly DataContext _context;

    public CategoryRepository(DataContext context) => _context = context;

    public async Task<Category?> GetByIdAsync(Guid id) =>
        await _context.Categories.FindAsync(id);

    public async Task<IEnumerable<Category>> GetAllAsync() =>
        await _context.Categories.AsNoTracking().ToListAsync();

    public async Task AddAsync(Category category)
    {
        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();
    }
}