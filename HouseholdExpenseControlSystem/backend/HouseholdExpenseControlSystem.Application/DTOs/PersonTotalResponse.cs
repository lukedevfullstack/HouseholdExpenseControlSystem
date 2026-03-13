namespace HouseholdExpenseControlSystem.Application.DTOs;

public record PersonTotalResponse(
    string Name,
    decimal TotalRecipes,
    decimal TotalExpenses,
    decimal Balance
);