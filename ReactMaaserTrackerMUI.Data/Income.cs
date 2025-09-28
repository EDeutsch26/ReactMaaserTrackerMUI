using System.Text.Json.Serialization;

namespace ReactMaaserTrackerMUI.Data
{
    public class Income
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int IncomeSourceId { get; set; }
        public string IncomeSourceName { get; set; }

        [JsonIgnore]
        public IncomeSource? IncomeSource { get; set; }
    }
}