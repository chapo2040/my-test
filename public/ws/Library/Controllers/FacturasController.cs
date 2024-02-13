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
    public class FacturasController : Controller
    {
        private readonly LibraryContext _context;

        public FacturasController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/Facturas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Factura>>> GetFactura()
        {
            return await _context.Factura.ToListAsync();
        }

        [HttpGet("facturas")]
        public IActionResult Facturas(int piUsuario, long plCliente, long plFolio, int piStatus)
        {
            try
            {
                SqlConnection conexion = (SqlConnection)_context.Database.GetDbConnection();
                SqlCommand comando = conexion.CreateCommand();
                conexion.Open();
                comando.CommandType = CommandType.StoredProcedure;
                comando.CommandText = "APP_LST_FACTURA";
                comando.Parameters.Add("@usuario", SqlDbType.Int).Value = piUsuario;
                comando.Parameters.Add("@cliente", SqlDbType.BigInt).Value = plCliente;
                comando.Parameters.Add("@folio", SqlDbType.BigInt).Value = plFolio;
                comando.Parameters.Add("@status", SqlDbType.Int).Value = piStatus;
                SqlDataReader reader = comando.ExecuteReader();

                List<Factura> lstFacturas = new List<Factura>();

                while (reader.Read())
                {
                    Factura loFactura = new Factura();
                    loFactura.FAC_USUCVE = reader.GetInt32("FAC_USUCVE");
                    loFactura.FAC_CLICVE = reader.GetInt64("FAC_CLICVE");
                    loFactura.FAC_CLAVE = reader.GetInt64("FAC_CLAVE");
                    loFactura.FAC_FOLIO = reader.GetString("FAC_FOLIO");                  
                    loFactura.FAC_DESCRIPCION = reader.GetString("FAC_DESCRIPCION");
                    loFactura.FAC_TIPO = reader.GetInt32("FAC_TIPO");
                    loFactura.FAC_IMPORTE = reader.GetDecimal("FAC_IMPORTE");
                    loFactura.FAC_STATUS = reader.GetInt32("FAC_STATUS");
                    loFactura.FAC_IMPUESTO = reader.GetString("FAC_IMPUESTO");
                    loFactura.FAC_IMPUESTO_IMPORTE = reader.GetDecimal("FAC_IMPUESTO_IMPORTE");
                    lstFacturas.Add(loFactura);
                }

                conexion.Close();

                return Ok(lstFacturas);
            }
            catch
            {
                return BadRequest("Errors.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Factura>> PostFactura(Factura factura)
        {
            _context.Factura.Add(factura);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFactura", new { id = factura.FAC_CLAVE }, factura);
        }

        [HttpPost("agregar")]
        public IActionResult FacturaAdd(Factura factura)
        {
            try
            {
                SqlConnection conexion = (SqlConnection)_context.Database.GetDbConnection();
                SqlCommand comando = conexion.CreateCommand();

                conexion.Open();
                comando.CommandType = CommandType.StoredProcedure;
                comando.CommandText = "APP_INS_FACTURA";

                comando.Parameters.Add("@usuario", SqlDbType.Int).Value = factura.FAC_USUCVE;
                comando.Parameters.Add("@cliente", SqlDbType.BigInt).Value = factura.FAC_CLICVE;
                comando.Parameters.Add("@folio", SqlDbType.VarChar, 20).Value = factura.FAC_FOLIO;
                comando.Parameters.Add("@descripcion", SqlDbType.VarChar, 255).Value = factura.FAC_DESCRIPCION;
                comando.Parameters.Add("@tipo", SqlDbType.Int).Value = factura.FAC_TIPO;
                comando.Parameters.Add("@importe", SqlDbType.Money).Value = factura.FAC_IMPORTE;
                comando.Parameters.Add("@impuesto", SqlDbType.VarChar, 10).Value = factura.FAC_IMPUESTO;
                comando.Parameters.Add("@impuestoImporte", SqlDbType.Money).Value = factura.FAC_IMPUESTO_IMPORTE;

                int liResultado = comando.ExecuteNonQuery();
                conexion.Close();

                return Ok(liResultado);
            }
            catch (Exception error)
            {
                return BadRequest("Errors: " + error.Message);
            }
        }


        [HttpPost("actualizar")]
        public ActionResult FacturaUpd(Factura factura)
        {
            try
            {
                SqlConnection conexion = (SqlConnection)_context.Database.GetDbConnection();
                SqlCommand comando = conexion.CreateCommand();

                conexion.Open();
                comando.CommandType = CommandType.StoredProcedure;
                comando.CommandText = "APP_UPD_FACTURA";

                comando.Parameters.Add("@usuario", SqlDbType.Int).Value = factura.FAC_USUCVE;
                comando.Parameters.Add("@cliente", SqlDbType.BigInt).Value = factura.FAC_CLICVE;
                comando.Parameters.Add("@clave", SqlDbType.BigInt).Value = factura.FAC_CLAVE;
                comando.Parameters.Add("@tipo", SqlDbType.Int).Value = factura.FAC_TIPO;
                comando.Parameters.Add("@status", SqlDbType.Int).Value = factura.FAC_STATUS;                

                int liResultado = comando.ExecuteNonQuery();
                conexion.Close();

                return Ok(liResultado);
            }
            catch (Exception error)
            {
                return BadRequest("Errors: " + error.Message);
            }
        }

        [HttpDelete("{usuario}, {cliente}, {factura}")]
        public IActionResult DeleteFactura(int usuario, long cliente, long factura)
        {
            try
            {
                SqlConnection conexion = (SqlConnection)_context.Database.GetDbConnection();
                SqlCommand comando = conexion.CreateCommand();

                conexion.Open();

                comando.CommandType = CommandType.StoredProcedure;
                comando.CommandText = "APP_DEL_FACTURA";
                comando.Parameters.Add("@usuario", SqlDbType.Int).Value = usuario;
                comando.Parameters.Add("@cliente", SqlDbType.BigInt).Value = cliente;
                comando.Parameters.Add("@factura", SqlDbType.BigInt).Value = factura;
                int liResultado = comando.ExecuteNonQuery();
                conexion.Close();

                return Ok(liResultado);
            }
            catch
            {
                return BadRequest("Errors.");
            }
        }

        private bool FacturaExists(int id)
        {
            return _context.Factura.Any(e => e.FAC_CLAVE == id);
        }

    }
}
