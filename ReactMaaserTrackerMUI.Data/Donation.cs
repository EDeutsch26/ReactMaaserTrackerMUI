using System.Data;

namespace ReactMaaserTrackerMUI.Data
{
    public class Donation
    {
        public int Id { get; set; }
        public string Recipient { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
    }
}