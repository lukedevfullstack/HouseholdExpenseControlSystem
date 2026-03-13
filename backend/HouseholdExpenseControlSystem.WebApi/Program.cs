using HouseholdExpenseControlSystem.Application.Interfaces;
using HouseholdExpenseControlSystem.Application.Services;
using HouseholdExpenseControlSystem.Infrastructure;
using Microsoft.EntityFrameworkCore;

SQLitePCL.Batteries.Init();

var builder = WebApplication.CreateBuilder(args);

// Configurações do SQLite
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registro de Camadas (Infrastructure e Application)
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IPersonService, PersonService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração Única de CORS
builder.Services.AddCors(options => {
    options.AddPolicy("DefaultPolicy", policy => {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Inicialização do Banco de Dados
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<DataContext>();
    
    // Garante que o banco exista e aplica o Seed
    context.Database.EnsureCreated();
    DbInitializer.Seed(context);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("DefaultPolicy"); 

app.UseAuthorization();
app.MapControllers();

app.Run();