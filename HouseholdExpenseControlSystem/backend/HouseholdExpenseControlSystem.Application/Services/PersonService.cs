using HouseholdExpenseControlSystem.Application.DTOs;
using HouseholdExpenseControlSystem.Application.Interfaces;
using HouseholdExpenseControlSystem.Domain.Entities;
using HouseholdExpenseControlSystem.Infrastructure.Interfaces;

namespace HouseholdExpenseControlSystem.Application.Services;

public class PersonService : IPersonService
{
    private readonly IPersonRepository _personRepo;
    private readonly ITransactionRepository _transactionRepo;

    public PersonService(IPersonRepository personRepo, ITransactionRepository transactionRepo)
    {
        _personRepo = personRepo;
        _transactionRepo = transactionRepo;
    }

    public async Task<IEnumerable<PersonResponse>> GetAllAsync()
    {
        var persons = await _personRepo.GetAllAsync();
        return persons.Select(p => new PersonResponse(p.Id, p.Name, p.Age));
    }

    public async Task<PersonTotalResponse> GetTotalsAsync(Guid personId)
    {
        var person = await _personRepo.GetByIdAsync(personId)
            ?? throw new Exception("Pessoa não encontrada");

        var transactions = await _transactionRepo.GetByPersonIdAsync(personId);

        var recipes = transactions.Where(t => t.Type == "Receita").Sum(t => t.Value);
        var expenses = transactions.Where(t => t.Type == "Despesa").Sum(t => t.Value);

        return new PersonTotalResponse(
            person.Name,
            recipes,
            expenses,
            recipes - expenses
        );
    }

    public async Task<PersonResponse> CreateAsync(PersonRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            throw new Exception("O nome é obrigatório.");

        var person = new Person(request.Name, request.Age);
        await _personRepo.AddAsync(person);

        return new PersonResponse(person.Id, person.Name, person.Age);
    }
}