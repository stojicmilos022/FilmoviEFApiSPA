using AutoMapper;

namespace FIlmoviEFApi.Models
{
    public class FilmoviProfile :Profile
    {
        public FilmoviProfile()
        {
            CreateMap<Filmovi, FilmoviDTO>();

            CreateMap<Filmovi, FilmoviDetailsDTO>();
        }

    }
}
