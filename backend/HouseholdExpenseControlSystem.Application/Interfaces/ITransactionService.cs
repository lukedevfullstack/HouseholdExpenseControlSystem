using HouseholdExpenseControlSystem.Application.DTOs;

namespace HouseholdExpenseControlSystem.Application.Interfaces;

public interface ITransactionService
{
    Task<TransactionResponse> CreateAsync(TransactionRequest request);
    Task<IEnumerable<TransactionResponse>> GetAllAsync();
    Task<TransactionResponse?> GetByIdAsync(Guid id);
}
