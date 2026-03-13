using HouseholdExpenseControlSystem.Domain.Entities;

namespace HouseholdExpenseControlSystem.Infrastructure.Interfaces;

/// <summary>
/// Contrato para persistência de transações.
/// Seguindo o SOLID, a implementação (Infrastructure) depende desta interface.
/// </summary>
public interface ITransactionRepository
{
    /// <summary>
    /// Adiciona uma nova transação ao banco de dados.
    /// </summary>
    Task AddAsync(Transaction transaction);

    /// <summary>
    /// Lista todas as transações, incluindo os dados de Pessoa e Categoria (Eager Loading).
    /// </summary>
    Task<IEnumerable<Transaction>> GetAllAsync();

    /// <summary>
    /// Busca uma transação específica pelo seu Identificador Único.
    /// </summary>
    Task<Transaction?> GetByIdAsync(Guid id);

    /// <summary>
    /// Opcional: Busca transações filtradas por uma pessoa específica.
    /// </summary>
    Task<IEnumerable<Transaction>> GetByPersonIdAsync(Guid personId);
}