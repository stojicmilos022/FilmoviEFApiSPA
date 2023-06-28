namespace FIlmoviEFApi.Models
{
    public class FilmoviDetailsDTO
    {
        public int Id { get; set; }
        public string Ime { get; set; }

        public string Zanr { get; set; }

        public int Godina { get; set; }

        public int ReziserId { get; set; }
        public string ReziserIme { get; set; }

        public string ReziserPrezime { get; set; }

        public int ReziserStarost { get; set; }


    }
}
