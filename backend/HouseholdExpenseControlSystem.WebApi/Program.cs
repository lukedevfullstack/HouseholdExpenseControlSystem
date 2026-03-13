using HouseholdExpenseControlSystem.Application.Interfaces;
using HouseholdExpenseControlSystem.Application.Services;
using HouseholdExpenseControlSystem.Infrastructure;
using Microsoft.EntityFrameworkCore;

SQLitePCL.Batteries.Init();

var builder = WebApplication.CreateBuilder(args);

// 1. Configura��o do SQLite
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Registro dos Reposit�rios (Infrastructure)
builder.Services.AddInfrastructure(builder.Configuration);

// 3. Registro dos Servi�os (Application)
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IPersonService, PersonService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.AllowAnyOrigin() // Em produção, coloque a URL do seu Front
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<DataContext>();

    // Cria o banco (caso n�o exista)
    context.Database.EnsureCreated();

    // Alimenta o banco com dados iniciais
    DbInitializer.Seed(context);
}

// Garantir que o banco seja criado ao iniciar
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DataContext>();
    context.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.UseCors("AllowReactApp");
app.Run();