using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class MaaserTrackerRepo
    {
        private readonly string _connectionS;

        public MaaserTrackerRepo(string cS)
        {
            _connectionS = cS;
        }

        public List<Income> GetIncomes()
        {
            using var ctx = new MaaserTrackerDataContext(_connectionS);
            return ctx.Incomes.Include(i => i.IncomeSource).Select(i => new Income
            {
                Id = i.Id,
                Amount = i.Amount,
                Date = i.Date,
                IncomeSourceId = i.IncomeSource.Id,
                IncomeSourceName = i.IncomeSource.Name
            }).ToList();
        }

        public void AddIncome(Income income)
        {
            using var ctx = new MaaserTrackerDataContext(_connectionS);
            ctx.Incomes.Add(income);
            ctx.SaveChanges();
        }

        public void AddDonation(Donation donation)
        {
            using var ctx = new MaaserTrackerDataContext(_connectionS);

            ctx.Donations.Add(donation);
            ctx.SaveChanges();
        }

        public List<Income> GetIncomesBySource(int sourceId)
        {
            using var ctx = new MaaserTrackerDataContext(_connectionS);
            return ctx.Incomes.Where(i => i.IncomeSourceId == sourceId).ToList();
        }

        public void AddSource(string sourceName)
        {
            using var ctx = new MaaserTrackerDataContext(_connectionS);
            ctx.IncomeSources.Add(new IncomeSource { Name = sourceName, IsActive = true });
            ctx.SaveChanges();
        }

        public void DeleteSource(IncomeSource source)
        {
            using var ctx = new MaaserTrackerDataContext(_connectionS);
            ctx.IncomeSources.Remove(source);
            ctx.SaveChanges();
        }

        public void EditSource(IncomeSource source)
        {

            using var ctx = new MaaserTrackerDataContext(_connectionS);
            var sourceDb = ctx.IncomeSources.Find(source.Id);
            sourceDb.Name = source.Name;

            ctx.SaveChanges();

        }


        public List<IncomeSource> GetActiveSources()
        {
            using var ctx = new MaaserTrackerDataContext(_connectionS);
            return ctx.IncomeSources.Where(s => s.IsActive == true).ToList();
        }

        public List<IncomeSource> GetGroupedIncomes()
        {
            using var ctx = new MaaserTrackerDataContext(_connectionS);
            return ctx.IncomeSources.Include(i => i.Incomes).ToList();
        }

        public List<Donation> GetDonations()
        {
            using var ctx = new MaaserTrackerDataContext(_connectionS);
            return ctx.Donations.ToList();
        }

        public MaaserStats GetMaaserStats()
        {
            using var ctx = new MaaserTrackerDataContext(_connectionS);
            return new MaaserStats
            {
                TotalIncome = ctx.Incomes.Sum(i => i.Amount),
                TotalDonated = ctx.Donations.Sum(d => d.Amount)
            };
        }


        public bool HasIncome(int id)
        {

            var ctx = new MaaserTrackerDataContext(_connectionS);
            return ctx.IncomeSources.Include(i => i.Incomes).FirstOrDefault(i => i.Id ==id).Incomes.Count != 0;
        }

        public string GetIcomeSourceNameById(int incomeSourceId)
        {
            var ctx = new MaaserTrackerDataContext(_connectionS);

            return ctx.IncomeSources.Find(incomeSourceId).Name;
        }
    }
}
