namespace HouseholdExpenseControlSystem.Domain.DTOs;

// O que recebemos do Front-end
public record TransactionRequest(
    string Description,
    decimal Value,
    string Type,
    Guid PersonId,
    Guid CategoryId
);