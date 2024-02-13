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
    public class ImpuestoController : Controller
    {
        private readonly LibraryContext _context;

        public ImpuestoController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/Impuesto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Impuesto>>> GetImpuesto()
        {
            return await _context.Impuesto.ToListAsync();
        }
    }
}
