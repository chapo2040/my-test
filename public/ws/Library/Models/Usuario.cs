using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Library.Models
{
    [PrimaryKey(nameof(USU_CLAVE))]
    public class Usuario
    {
        public int USU_CLAVE { get; set; }
        public string? USU_NOMBRE { get; set; }
        public string? USU_CORREO { get; set; }
        public string? USU_PASSWORD { get; set; }
        public int? USU_PLAN { get; set; }
        public DateTime? USU_REGISTRO { get; set; }
    }
}
