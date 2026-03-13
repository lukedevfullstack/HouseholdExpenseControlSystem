using HouseholdExpenseControlSystem.Domain.Entities;
using HouseholdExpenseControlSystem.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenseControlSystem.Infrastructure.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly DataContext _context;

    public TransactionRepository(DataContext context) => _context = context;

    public async Task AddAsync(Transaction transaction)
    {
        await _context.Transactions.AddAsync(transaction);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Transaction>> GetAllAsync()
    {
        return await _context.Transactions
            .Include(t => t.Person)   // Traz os dados da Pessoa vinculada
            .Include(t => t.Category) // Traz os dados da Categoria vinculada
            .AsNoTracking()
            .OrderByDescending(t => t.Id) // Opcional: listar as mais recentes primeiro
            .ToListAsync();
    }

    public Task<Transaction?> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<Transaction>> GetByPersonIdAsync(Guid personId)
    {
        return await _context.Transactions.Where(t => t.PersonId == personId).ToListAsync();
    }
}
