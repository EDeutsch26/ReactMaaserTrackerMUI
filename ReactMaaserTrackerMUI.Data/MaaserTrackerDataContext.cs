using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class MaaserTrackerDataContext : DbContext
    {
        private readonly string _connectionString;

        public MaaserTrackerDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Restrict cascade delete for all relationships pointing to IncomeSource
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var foreignKey in entityType.GetForeignKeys())
                {
                    if (foreignKey.PrincipalEntityType.ClrType == typeof(IncomeSource))
                    {
                        foreignKey.DeleteBehavior = DeleteBehavior.Restrict;
                    }
                }
            }

            // Optional: Explicit configuration for Income → IncomeSource
            modelBuilder.Entity<Income>()
                .HasOne(i => i.IncomeSource)
                .WithMany(s => s.Incomes)
                .OnDelete(DeleteBehavior.Restrict);
        }


        //public DbSet<User> Users { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Donation> Donations { get; set; }
        public DbSet<IncomeSource> IncomeSources { get; set; }

    }
}
