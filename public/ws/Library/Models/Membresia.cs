using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Library.Models
{
    [PrimaryKey(nameof(MBR_CLAVE))]
    public class Membresia
    {
        public int MBR_CLAVE { get; set; }
        public string? MBR_NOMBRE { get; set; }        
        public int? MBR_CLIENTES { get; set; }
        public decimal? MBR_PRECIO { get; set; }
    }
}
