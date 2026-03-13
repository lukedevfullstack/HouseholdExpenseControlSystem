using HouseholdExpenseControlSystem.Domain.Entities;

namespace HouseholdExpenseControlSystem.Infrastructure;

public static class DbInitializer
{
    public static void Seed(DataContext context)
    {
        // Só popula se o banco estiver vazio
        if (context.Persons.Any()) return;

        // 1. Adicionar Pessoas
        var lucas = new Person("Lucas Silva", 25);
        var joao = new Person("Joãozinho", 10); // Menor de idade para testar a trava

        context.Persons.AddRange(lucas, joao);

        // 2. Adicionar Categorias
        var catSalario = new Category("Salário", "Receita");
        var catAluguel = new Category("Aluguel", "Despesa");
        var catLazer = new Category("Lazer", "Ambas");

        context.Categories.AddRange(catSalario, catAluguel, catLazer);

        context.SaveChanges();
    }
}