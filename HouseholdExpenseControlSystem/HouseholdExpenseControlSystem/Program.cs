using Microsoft.EntityFrameworkCore;
using HOUSEHOLDEXPENSECONTROLSYSTEM.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuração do Banco de Dados (SQLite)
// O arquivo 'household.db' será criado na raiz do projeto.
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlite("Data Source=household.db"));

// 2. Configuração de JSON
// Evita ciclos infinitos na serialização de objetos relacionados (Pessoa <-> Transação)
builder.Services.AddControllers().AddJsonOptions(x =>
   x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// 3. Configuração de CORS
// Permite que o Front-end (React/Vite geralmente na porta 5173 ou 3000) acesse a API
builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 4. Swagger/OpenAPI para testes rápidos
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 5. Garantir que o Banco de Dados seja criado ao iniciar
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DataContext>();
    db.Database.EnsureCreated();
}

// Configuração do pipeline de requisições HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Ativa a política de CORS definida acima
app.UseCors("DefaultPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();