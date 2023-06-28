using Microsoft.EntityFrameworkCore;
using System;

namespace FIlmoviEFApi.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Reziser> Reziseri { get; set; }
        public DbSet<Filmovi> Filmovi { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Reziser>().HasData(
                new Reziser () { Id = 1,Ime = "Christopher", Prezime = "Nolan", Starost = 50 },
                new Reziser () { Id = 2, Ime = "Quentin", Prezime = "Tarantino", Starost = 58 },
                new Reziser () { Id = 3, Ime = "Steven", Prezime = "Spielberg", Starost = 75 },
                new Reziser () { Id = 4, Ime = "Martin", Prezime = "Scorsese", Starost = 79 },
                new Reziser () { Id = 5, Ime = "David", Prezime = "Fincher", Starost = 59 }
                );

            modelBuilder.Entity<Filmovi>().HasData(
                        new Filmovi() { Id = 1, Ime="neki film",Zanr="Komedija",Godina=1985,ReziserId=2 },
                        new Filmovi() { Id = 2, Ime = "neki drugi film", Zanr = "Horor", Godina = 1985, ReziserId = 3 },
                        new Filmovi() { Id = 3, Ime = "neki treci film", Zanr = "Komedija", Godina = 1985, ReziserId = 5 },
                        new Filmovi() { Id = 4, Ime = "neki cetvrti film", Zanr = "Komedija", Godina = 1985, ReziserId = 4 },
                        new Filmovi() { Id = 5, Ime = "neki peti film", Zanr = "Komedija", Godina = 1985, ReziserId = 1 }
                        );
        }
    }
}
