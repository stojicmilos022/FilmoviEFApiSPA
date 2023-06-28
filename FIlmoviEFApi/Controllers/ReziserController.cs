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
    public class ReziserController : ControllerBase
    {
        private readonly AppDbContext _context;


        public ReziserController(AppDbContext context)

        {
            _context = context;

        }

        // GET: api/Filmovi
        [HttpGet]
        public IActionResult GetReziseri()
        {
            return Ok(_context.Reziseri.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetReziser(int id)
        {

            var reziser = _context.Reziseri.SingleOrDefault(b => b.Id == id);

            if (reziser == null)
            {
                return NotFound();
            }

            return Ok(reziser);
        }

        private bool ReziserExists(int id)
        {
            return _context.Reziseri.Any(e => e.Id == id);
        }

        [HttpPut("{id}")]
        public IActionResult PutReziser(int id, Reziser reziser)
        {
            if (id != reziser.Id)
            {
                return BadRequest();
            }

            _context.Entry(reziser).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReziserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(reziser);
        }



        [HttpPost]
        public IActionResult PostReziser(Reziser reziser)
        {
            _context.Reziseri.Add(reziser);
            _context.SaveChanges();

            return CreatedAtAction("GetReziser", new { id = reziser.Id }, reziser);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteReziser(int id)
        {
            var reziser = _context.Reziseri.Find(id);
            if (reziser == null)
            {
                return NotFound();
            }

            _context.Reziseri.Remove(reziser);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
