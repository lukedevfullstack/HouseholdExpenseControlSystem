using HOUSEHOLDEXPENSECONTROLSYSTEM.Data;
using HOUSEHOLDEXPENSECONTROLSYSTEM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HOUSEHOLDEXPENSECONTROLSYSTEM.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly DataContext _context;

        public TransactionController(DataContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> Get() => 
            await _context.Transactions.Include(t => t.Category).Include(t => t.Person).ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Transaction>> Post(Transaction transaction)
        {
            var person = await _context.Persons.FindAsync(transaction.PersonId);
            var category = await _context.Categories.FindAsync(transaction.CategoryId);

            if (person == null || category == null) return BadRequest("Pessoa ou Categoria inválida.");

            // LÓGICA: Menor de 18 anos só pode registrar DESPESA
            if (person.Age < 18 && transaction.Type == "Receita")
            {
                return BadRequest("Menores de 18 anos não podem registrar receitas.");
            }

            // LÓGICA: Validar finalidade da categoria
            // Se a categoria for só 'Receita' e a transação for 'Despesa', bloqueia.
            if ((category.Purpose == "Receita" && transaction.Type == "Despesa") ||
                (category.Purpose == "Despesa" && transaction.Type == "Receita"))
            {
                return BadRequest("A categoria selecionada não permite este tipo de transação.");
            }

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return Ok(transaction);
        }
    }
}