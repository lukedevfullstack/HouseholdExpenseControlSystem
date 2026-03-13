namespace HouseholdExpenseControlSystem.Domain.Exceptions;

// Exceção base para o domínio
public class DomainException : Exception
{
    public DomainException(string message) : base(message) { }
}