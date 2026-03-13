using HouseholdExpenseControlSystem.Application.DTOs;

namespace HouseholdExpenseControlSystem.Application.Interfaces;

public interface IPersonService
{
    Task<PersonResponse> CreateAsync(PersonRequest request);
    Task<IEnumerable<PersonResponse>> GetAllAsync();
    Task<PersonTotalResponse> GetTotalsAsync(Guid personId);
}