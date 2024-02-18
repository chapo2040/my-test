using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Library.Models;

namespace Library.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext (DbContextOptions<LibraryContext> options)
            : base(options)
        {
        }
        public DbSet<Library.Models.Archivo> Archivo { get; set; } = default!;
        public DbSet<Library.Models.SolicitudEntrada> SolicitudEntrada { get; set; } = default!;
        public DbSet<Library.Models.Book> Book { get; set; } = default!;
        public DbSet<Library.Models.Usuario> Usuario { get; set; } = default!;
        public DbSet<Library.Models.Cliente> Cliente { get; set; } = default!;
        public DbSet<Library.Models.Factura> Factura { get; set; } = default!;
        public DbSet<Library.Models.Contabilidad> Contabilidad { get; set; } = default!;
        public DbSet<Library.Models.Impuesto> Impuesto { get; set; } = default!;
        public DbSet<Library.Models.Membresia> Membresia { get; set; } = default!;
    }
}
