using HouseholdExpenseControlSystem.Application.DTOs;
using HouseholdExpenseControlSystem.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HouseholdExpenseControlSystem.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonController : ControllerBase
{
    private readonly IPersonService _personService;

    public PersonController(IPersonService personService)
    {
        _personService = personService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PersonRequest request)
    {
        try
        {
            var result = await _personService.CreateAsync(request);
            return CreatedAtAction(nameof(GetAll), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _personService.GetAllAsync());

    [HttpGet("{id}/totals")]
    public async Task<IActionResult> GetTotals(Guid id)
    {
        try
        {
            return Ok(await _personService.GetTotalsAsync(id));
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}