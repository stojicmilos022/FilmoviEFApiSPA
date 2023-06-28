using Microsoft.EntityFrameworkCore.Migrations;

namespace FIlmoviEFApi.Migrations
{
    public partial class DbInitial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reziseri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Starost = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reziseri", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Filmovi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Zanr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Godina = table.Column<int>(type: "int", nullable: false),
                    ReziserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Filmovi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Filmovi_Reziseri_ReziserId",
                        column: x => x.ReziserId,
                        principalTable: "Reziseri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Reziseri",
                columns: new[] { "Id", "Ime", "Prezime", "Starost" },
                values: new object[,]
                {
                    { 1, "Christopher", "Nolan", 50 },
                    { 2, "Quentin", "Tarantino", 58 },
                    { 3, "Steven", "Spielberg", 75 },
                    { 4, "Martin", "Scorsese", 79 },
                    { 5, "David", "Fincher", 59 }
                });

            migrationBuilder.InsertData(
                table: "Filmovi",
                columns: new[] { "Id", "Godina", "Ime", "ReziserId", "Zanr" },
                values: new object[,]
                {
                    { 5, 1985, "neki peti film", 1, "Komedija" },
                    { 1, 1985, "neki film", 2, "Komedija" },
                    { 2, 1985, "neki drugi film", 3, "Horor" },
                    { 4, 1985, "neki cetvrti film", 4, "Komedija" },
                    { 3, 1985, "neki treci film", 5, "Komedija" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Filmovi_ReziserId",
                table: "Filmovi",
                column: "ReziserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Filmovi");

            migrationBuilder.DropTable(
                name: "Reziseri");
        }
    }
}
