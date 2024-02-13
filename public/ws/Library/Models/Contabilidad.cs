using Microsoft.EntityFrameworkCore;

namespace Library.Models
{
    [PrimaryKey(nameof(CTB_USUCVE), nameof(CTB_CLAVE))]
    public class Contabilidad
    {
        public int CTB_USUCVE { get; set; }
        public long CTB_CLAVE { get; set; }
        public int? CTB_PROCESO { get; set; }
        public int? CTB_ANO { get; set; }
        public int? CTB_DIA { get; set; }
    }
}
