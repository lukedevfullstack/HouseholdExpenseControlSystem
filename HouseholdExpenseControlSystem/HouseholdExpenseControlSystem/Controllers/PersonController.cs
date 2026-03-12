using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HOUSEHOLDEXPENSECONTROLSYSTEM.Data;
using HOUSEHOLDEXPENSECONTROLSYSTEM.Models;

namespace HOUSEHOLDEXPENSECONTROLSYSTEM.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly DataContext _context;

        public PersonController(DataContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> Get() => 
            await _context.Persons.ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Person>> Post(Person person)
        {
            _context.Persons.Add(person);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = person.Id }, person);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var person = await _context.Persons.FindAsync(id);
            if (person == null) return NotFound();

            // O EF Core cuidará da deleção das transações se o Cascade estiver ativo
            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Endpoint de Totais por Pessoa (Requisito de Consulta)
        [HttpGet("totals")]
        public async Task<IActionResult> GetTotals()
        {
            var totals = await _context.Persons
                .Select(p => new {
                    p.Name,
                    TotalRevenue = p.Transactions.Where(t => t.Type == "Receita").Sum(t => t.Value),
                    TotalExpense = p.Transactions.Where(t => t.Type == "Despesa").Sum(t => t.Value),
                    Balance = p.Transactions.Where(t => t.Type == "Receita").Sum(t => t.Value) - 
                              p.Transactions.Where(t => t.Type == "Despesa").Sum(t => t.Value)
                }).ToListAsync();

            return Ok(new {
                Items = totals,
                GlobalRevenue = totals.Sum(x => x.TotalRevenue),
                GlobalExpense = totals.Sum(x => x.TotalExpense),
                NetBalance = totals.Sum(x => x.Balance)
            });
        }
    }
}