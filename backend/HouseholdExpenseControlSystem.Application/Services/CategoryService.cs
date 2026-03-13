using HouseholdExpenseControlSystem.Application.DTOs;
using HouseholdExpenseControlSystem.Application.Interfaces;
using HouseholdExpenseControlSystem.Domain.Entities;
using HouseholdExpenseControlSystem.Domain.Exceptions;
using HouseholdExpenseControlSystem.Infrastructure.Interfaces;

namespace HouseholdExpenseControlSystem.Application.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepo;

    public CategoryService(ICategoryRepository categoryRepo)
    {
        _categoryRepo = categoryRepo;
    }

    public async Task<CategoryResponse> CreateAsync(CategoryRequest request)
    {
        // Validação simples de negócio
        if (string.IsNullOrWhiteSpace(request.Description))
            throw new DomainException("A descrição da categoria é obrigatória.");

        var category = new Category(request.Description, request.Purpose);

        await _categoryRepo.AddAsync(category);

        return new CategoryResponse(category.Id, category.Description, category.Purpose);
    }

    public async Task<IEnumerable<CategoryResponse>> GetAllAsync()
    {
        var categories = await _categoryRepo.GetAllAsync();
        return categories.Select(c => new CategoryResponse(c.Id, c.Description, c.Purpose));
    }
}