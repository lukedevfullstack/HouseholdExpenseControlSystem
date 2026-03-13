using HouseholdExpenseControlSystem.Application.DTOs;
using HouseholdExpenseControlSystem.Application.Interfaces;
using HouseholdExpenseControlSystem.Domain.Entities;
using HouseholdExpenseControlSystem.Domain.Exceptions;
using HouseholdExpenseControlSystem.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

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

    public async Task<GeneralTotalDto> GetCategoryTotalsAsync()
    {
        // Busca todas as categorias incluindo as transações relacionadas
        var categories = await _categoryRepo.GetAllWithTransactionsAsync();

        var result = new GeneralTotalDto();

        foreach (var category in categories)
        {
            var recipes = category.Transactions
                .Where(t => t.Type == "Receita")
                .Sum(t => t.Value);

            var expenses = category.Transactions
                .Where(t => t.Type == "Despesa")
                .Sum(t => t.Value);

            result.Categories.Add(new CategoryTotalDto
            {
                CategoryName = category.Description,
                TotalRecipes = recipes,
                TotalExpenses = expenses,
                Balance = recipes - expenses
            });
        }

        // Calcula os totais gerais (Soma de tudo)
        result.GrandTotalRecipes = result.Categories.Sum(x => x.TotalRecipes);
        result.GrandTotalExpenses = result.Categories.Sum(x => x.TotalExpenses);
        result.GrandTotalBalance = result.GrandTotalRecipes - result.GrandTotalExpenses;

        return result;
    }
}