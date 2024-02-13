using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Library.Models
{
    [PrimaryKey(nameof(FAC_USUCVE), nameof(FAC_CLICVE), nameof(FAC_CLAVE))]
    public class Factura
    {
        public int FAC_USUCVE { get; set; }
        public long FAC_CLICVE { get; set; }
        public long FAC_CLAVE { get; set; }
        public string? FAC_FOLIO { get; set; }
        public string? FAC_DESCRIPCION { get; set; }
        public int FAC_TIPO { get; set; }        
        public decimal? FAC_IMPORTE { get; set; }
        public DateTime? FAC_FECHA { get; set; }
        public int FAC_STATUS { get; set; }
        public string? FAC_IMPUESTO { get; set; }
        public decimal? FAC_IMPUESTO_IMPORTE { get; set; }
    }
}
