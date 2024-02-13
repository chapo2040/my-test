using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Library.Models
{
    [PrimaryKey(nameof(ARC_ID))]
    public class Archivo
    {
        public int ARC_ID { get; set; }        
        public string? ARC_NOMBRE { get; set; }
    }
}
