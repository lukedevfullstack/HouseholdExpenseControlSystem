namespace HouseholdExpenseControlSystem.Domain.DTOs;

public record TransactionResponse(
    Guid Id,
    string Description,
    decimal Value,
    string Type,
    string PersonName,
    string CategoryDescription
);