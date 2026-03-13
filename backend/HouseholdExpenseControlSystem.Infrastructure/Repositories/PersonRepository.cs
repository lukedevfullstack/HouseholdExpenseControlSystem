using HouseholdExpenseControlSystem.Domain.Entities;
using HouseholdExpenseControlSystem.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenseControlSystem.Infrastructure.Repositories;

public class PersonRepository : IPersonRepository
{
    private readonly DataContext _context;

    public PersonRepository(DataContext context) => _context = context;

    public async Task<Person?> GetByIdAsync(Guid id) =>
        await _context.Persons.Include(p => p.Transactions).FirstOrDefaultAsync(p => p.Id == id);

    public async Task<IEnumerable<Person>> GetAllAsync() =>
        await _context.Persons.AsNoTracking().ToListAsync();

    public async Task AddAsync(Person person)
    {
        await _context.Persons.AddAsync(person);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var person = await _context.Persons.FindAsync(id);
        if (person != null)
        {
            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();
        }
    }

    // Consulta de totais por pessoa (Requisito: Totais e Saldo)
    public async Task<object> GetTotalsAsync()
    {
        var query = await _context.Persons
            .Select(p => new {
                p.Name,
                TotalRevenue = p.Transactions.Where(t => t.Type == "Receita").Sum(t => t.Value),
                TotalExpense = p.Transactions.Where(t => t.Type == "Despesa").Sum(t => t.Value),
                Balance = p.Transactions.Where(t => t.Type == "Receita").Sum(t => t.Value) -
                          p.Transactions.Where(t => t.Type == "Despesa").Sum(t => t.Value)
            }).ToListAsync();

        return new
        {
            Items = query,
            GlobalRevenue = query.Sum(x => x.TotalRevenue),
            GlobalExpense = query.Sum(x => x.TotalExpense),
            NetBalance = query.Sum(x => x.Balance)
        };
    }

    public async Task<IEnumerable<Person>> GetAllWithTransactionsAsync()
    {
        return await _context.Persons
            .Include(p => p.Transactions)
            .ToListAsync();
    }

    public Task UpdateAsync(Person person)
    {
        throw new NotImplementedException();
    }
}