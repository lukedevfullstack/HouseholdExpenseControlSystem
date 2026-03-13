namespace HouseholdExpenseControlSystem.Application.DTOs;

public record PersonResponse(
    Guid Id, 
    string Name,
    int Age);