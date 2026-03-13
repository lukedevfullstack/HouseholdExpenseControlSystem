using HouseholdExpenseControlSystem.Application.DTOs;

namespace HouseholdExpenseControlSystem.Application.Interfaces;

public interface ICategoryService
{
    Task<CategoryResponse> CreateAsync(CategoryRequest request);
    Task<IEnumerable<CategoryResponse>> GetAllAsync();
    Task<GeneralTotalDto> GetCategoryTotalsAsync();
}