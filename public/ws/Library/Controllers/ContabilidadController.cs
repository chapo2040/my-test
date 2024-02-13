using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Library.Data;
using Library.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContabilidadController : Controller
    {
        private readonly LibraryContext _context;

        public ContabilidadController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/Contabilidad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contabilidad>>> GetContabilidad()
        {
            return await _context.Contabilidad.ToListAsync();
        }
    }
}
