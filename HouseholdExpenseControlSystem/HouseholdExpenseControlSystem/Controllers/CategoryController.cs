using HOUSEHOLDEXPENSECONTROLSYSTEM.Data;
using HOUSEHOLDEXPENSECONTROLSYSTEM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HOUSEHOLDEXPENSECONTROLSYSTEM.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly DataContext _context;

        public CategoryController(DataContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> Get() => 
            await _context.Categories.ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Category>> Post(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return Ok(category);
        }
    }
}