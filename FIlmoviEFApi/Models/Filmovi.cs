namespace FIlmoviEFApi.Models
{
    public class Filmovi
    {
        public int Id { get; set; }

        public string Ime { get; set; }

        public string Zanr { get; set; }

        public int Godina { get; set; }

        public Reziser Reziser { get; set; }

        public int ReziserId { get; set; }
    }
}
