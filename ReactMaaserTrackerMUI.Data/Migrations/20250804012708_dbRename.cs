using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactMaaserTrackerMUI.Data.Migrations
{
    /// <inheritdoc />
    public partial class dbRename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IncomeSourceName",
                table: "Incomes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_IncomeSourceId",
                table: "Incomes",
                column: "IncomeSourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Incomes_IncomeSources_IncomeSourceId",
                table: "Incomes",
                column: "IncomeSourceId",
                principalTable: "IncomeSources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Incomes_IncomeSources_IncomeSourceId",
                table: "Incomes");

            migrationBuilder.DropIndex(
                name: "IX_Incomes_IncomeSourceId",
                table: "Incomes");

            migrationBuilder.DropColumn(
                name: "IncomeSourceName",
                table: "Incomes");
        }
    }
}
