namespace ReactMaaserTrackerMUI.Data
{
    public class IncomeSource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Income> Incomes { get; set; }
        public bool IsActive { get; set; }
    }
}