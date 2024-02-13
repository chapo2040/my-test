using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Library.Models
{
    [PrimaryKey(nameof(CLI_USUCVE), nameof(CLI_CLAVE))]
    public class Cliente
    {        
        public int CLI_USUCVE { get; set; }     
        public long CLI_CLAVE { get; set; }
        public string? CLI_RFC { get; set; }
        public string? CLI_NOMBRE { get; set; }
        public string? CLI_FIEL { get; set; }
        public string? CLI_KEY { get; set; }
        public string? CLI_PASSWORD { get; set; }
    }
}
