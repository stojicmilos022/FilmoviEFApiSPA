using AutoMapper;
using AutoMapper.QueryableExtensions;
using FIlmoviEFApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace FIlmoviEFApi.Controllers
{

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class FilmoviController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public FilmoviController(AppDbContext context, IMapper mapper)
        //public FilmoviController(AppDbContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Filmovi
        [HttpGet]
        public IActionResult GetFilmovi()
        {
            return Ok(_context.Filmovi.ProjectTo<FilmoviDTO>(_mapper.ConfigurationProvider).ToList());
        }


        [HttpGet("{id}")]
        public IActionResult GetFilm(int id)
        {

            var book = _context.Filmovi.ProjectTo<FilmoviDetailsDTO>(_mapper.ConfigurationProvider).SingleOrDefault(b => b.Id == id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        private bool FilmExists(int id)
        {
            return _context.Filmovi.Any(e => e.Id == id);
        }

        [HttpPut("{id}")]
        public IActionResult PutFilm(int id, Filmovi film)
        {
            if (id != film.Id)
            {
                return BadRequest();
            }

            _context.Entry(film).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilmExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(film);
        }

        [HttpPost]
        public IActionResult PostFilm(Filmovi film)
        {
            _context.Filmovi.Add(film);
            _context.SaveChanges();

            return CreatedAtAction("GetFilm", new { id = film.Id }, film);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteFilm(int id)
        {
            var film = _context.Filmovi.Find(id);
            if (film == null)
            {
                return NotFound();
            }

            _context.Filmovi.Remove(film);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
