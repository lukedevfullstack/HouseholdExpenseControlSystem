using HouseholdExpenseControlSystem.Domain.DTOs;
using HouseholdExpenseControlSystem.Domain.Entities;
using HouseholdExpenseControlSystem.Domain.Exceptions;
using HouseholdExpenseControlSystem.Domain.Interfaces;
using HouseholdExpenseControlSystem.Infrastructure.Interfaces;

public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _transactionRepo;
    private readonly IPersonRepository _personRepo;
    private readonly ICategoryRepository _categoryRepo;

    public TransactionService(
        ITransactionRepository transactionRepo,
        IPersonRepository personRepo,
        ICategoryRepository categoryRepo)
    {
        _transactionRepo = transactionRepo;
        _personRepo = personRepo;
        _categoryRepo = categoryRepo;
    }

    public async Task<TransactionResponse> CreateAsync(TransactionRequest request)
    {
        // 1. Busca as entidades relacionadas
        var person = await _personRepo.GetByIdAsync(request.PersonId)
            ?? throw new DomainException("Pessoa não encontrada.");

        var category = await _categoryRepo.GetByIdAsync(request.CategoryId)
            ?? throw new DomainException("Categoria não encontrada.");

        // 2. Chama a Factory no Domínio (onde as regras de negócio de 18 anos/finalidade residem)
        var transaction = Transaction.Create(
            request.Description,
            request.Value,
            request.Type,
            person.Id,
            category.Id,
            person.Age,
            category.Purpose
        );

        // 3. Persiste
        await _transactionRepo.AddAsync(transaction);

        // 4. Mapeia para Resposta
        return new TransactionResponse(
            transaction.Id,
            transaction.Description,
            transaction.Value,
            transaction.Type,
            person.Name,
            category.Description
        );
    }

    public async Task<IEnumerable<TransactionResponse>> GetAllAsync()
    {
        var transactions = await _transactionRepo.GetAllAsync();

        return transactions.Select(t => new TransactionResponse(
            t.Id,
            t.Description,
            t.Value,
            t.Type,
            t.Person.Name,
            t.Category.Description
        ));
    }

    public async Task<TransactionResponse?> GetByIdAsync(Guid id)
    {
        var transactions = await _transactionRepo.GetAllAsync();
        var t = transactions.FirstOrDefault(x => x.Id == id);

        if (t == null) return null;

        return new TransactionResponse(t.Id, t.Description, t.Value, t.Type, t.Person.Name, t.Category.Description);
    }
}