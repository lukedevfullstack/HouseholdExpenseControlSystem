using HouseholdExpenseControlSystem.Application.DTOs;
using HouseholdExpenseControlSystem.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HouseholdExpenseControlSystem.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    private readonly ITransactionService _transactionService;

    // Injeção de Dependência via Interface (SOLID - Dependency Inversion)
    public TransactionController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    /// <summary>
    /// Cria uma nova transação validando regras de domínio.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] TransactionRequest request)
    {
        try
        {
            var result = await _transactionService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        catch (InvalidOperationException ex)
        {
            // Captura regras de negócio (ex: menor de idade, categoria inválida)
            return BadRequest(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            // Captura erros de validação de dados
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var transaction = await _transactionService.GetByIdAsync(id);
        return transaction is not null ? Ok(transaction) : NotFound();
    }
}