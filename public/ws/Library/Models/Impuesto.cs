using Microsoft.EntityFrameworkCore;

namespace Library.Models
{
    [PrimaryKey(nameof(IMP_CLAVE))]
    public class Impuesto
    {
        public int IMP_CLAVE { get; set; }
        public string? IMP_CODIGO { get; set; }
        public string? IMP_DESCRIPCION { get; set; }
    }
}
