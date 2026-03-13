namespace HouseholdExpenseControlSystem.Application.DTOs
{
    public class CategoryTotalDto
    {
        public string CategoryName { get; set; } = string.Empty;
        public decimal TotalRecipes { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal Balance { get; set; }
    }

    public class GeneralTotalDto
    {
        public List<CategoryTotalDto> Categories { get; set; } = new();
        public decimal GrandTotalRecipes { get; set; }
        public decimal GrandTotalExpenses { get; set; }
        public decimal GrandTotalBalance { get; set; }
    }
}