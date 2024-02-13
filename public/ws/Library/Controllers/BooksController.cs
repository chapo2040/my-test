using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Library.Data;
using Library.Models;
using Microsoft.IdentityModel.Tokens;

using System.Data;
using System.Data.SqlClient;
using Microsoft.Data.SqlClient;


namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BooksController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBook()
        {
            return await _context.Book.ToListAsync();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Book.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpGet("name")]
        public IActionResult GetBooksName(string? nombre = null)
        {
            try
            {
                List<Book> books = new List<Book>();

                if (nombre.IsNullOrEmpty() == true)
                {
                    books = _context.Book.ToList();
                }
                else
                {
                    //books = _context.Book.Where(x => x.name.ToLower().IndexOf(nombre) > -1).ToList();

                    SqlConnection conexion = (SqlConnection)_context.Database.GetDbConnection();
                    SqlCommand comando = conexion.CreateCommand();
                    conexion.Open();
                    comando.CommandType = CommandType.StoredProcedure;
                    comando.CommandText = "APP_LST_BOOK";
                    comando.Parameters.Add("@nombre", SqlDbType.VarChar, 50).Value = nombre;
                    SqlDataReader reader = comando.ExecuteReader();

                    while (reader.Read()) 
                    {
                        Book book = new Book();
                        book.id = reader.GetInt32("id");
                        book.name = reader.GetString("name");
                        books.Add(book);
                    }

                    conexion.Close();
                }

                return Ok(books);
            }
            catch
            {
                return BadRequest("Errors.");
            }            
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.id)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            _context.Book.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.id }, book);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Book.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Book.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Book.Any(e => e.id == id);
        }
    }
}
