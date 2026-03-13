using HouseholdExpenseControlSystem.Domain.DTOs;

namespace HouseholdExpenseControlSystem.Domain.Interfaces;

public interface ITransactionService
{
    Task<TransactionResponse> CreateAsync(TransactionRequest request);
    Task<IEnumerable<TransactionResponse>> GetAllAsync();
    Task<TransactionResponse?> GetByIdAsync(Guid id);
}
