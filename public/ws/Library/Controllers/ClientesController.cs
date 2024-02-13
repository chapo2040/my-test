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
    public class ClientesController : ControllerBase
    {
        private readonly LibraryContext _context;

        public ClientesController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/Clientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetCliente()
        {
            return await _context.Cliente.ToListAsync();
        }

        [HttpGet("cliente")]
        public IActionResult Clientes(int piUsuario, long plCliente)
        {
            try
            {
                SqlConnection conexion = (SqlConnection)_context.Database.GetDbConnection();
                SqlCommand comando = conexion.CreateCommand();
                conexion.Open();
                comando.CommandType = CommandType.StoredProcedure;
                comando.CommandText = "APP_LST_CLIENTE";
                comando.Parameters.Add("@usuario", SqlDbType.Int).Value = piUsuario;
                comando.Parameters.Add("@cliente", SqlDbType.BigInt).Value = plCliente;
                SqlDataReader reader = comando.ExecuteReader();

                List<Cliente> lstClientes = new List<Cliente>();

                while (reader.Read())
                {
                    Cliente loCliente = new Cliente();
                    loCliente.CLI_USUCVE = reader.GetInt32("CLI_USUCVE");
                    loCliente.CLI_CLAVE = reader.GetInt64("CLI_CLAVE");
                    loCliente.CLI_RFC = reader.GetString("CLI_RFC");
                    loCliente.CLI_NOMBRE = reader.GetString("CLI_NOMBRE");
                    loCliente.CLI_FIEL = reader.GetString("CLI_FIEL");
                    loCliente.CLI_KEY = reader.GetString("CLI_KEY");
                    loCliente.CLI_PASSWORD = reader.GetString("CLI_PASSWORD");
                    lstClientes.Add(loCliente);
                }

                conexion.Close();

                return Ok(lstClientes);
            }
            catch
            {
                return BadRequest("Errors.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Cliente>> PostCliente(Cliente cliente)
        {
            _context.Cliente.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCliente", new { id = cliente.CLI_RFC }, cliente);
        }

        [HttpPost("agregar")]
        public IActionResult ClienteAdd(Cliente cliente)
        {
            try
            {
                SqlConnection conexion = (SqlConnection)_context.Database.GetDbConnection();
                SqlCommand comando = conexion.CreateCommand();
                
                conexion.Open();
                comando.CommandType = CommandType.StoredProcedure;
                comando.CommandText = "APP_INS_CLIENTE";

                comando.Parameters.Add("@usuario", SqlDbType.Int).Value = cliente.CLI_USUCVE;
                comando.Parameters.Add("@rfc", SqlDbType.VarChar, 20).Value = cliente.CLI_RFC;
                comando.Parameters.Add("@nombre", SqlDbType.VarChar, 255).Value = cliente.CLI_NOMBRE;
                comando.Parameters.Add("@fiel", SqlDbType.VarChar, 50).Value = cliente.CLI_FIEL;
                comando.Parameters.Add("@key", SqlDbType.VarChar, 50).Value = cliente.CLI_KEY;
                comando.Parameters.Add("@password", SqlDbType.VarChar, 50).Value = cliente.CLI_PASSWORD;

                int liResultado = comando.ExecuteNonQuery();
                conexion.Close();

                return Ok(liResultado);
            }
            catch(Exception error)
            {
                return BadRequest("Errors: " + error.Message);
            }
        }


        [HttpPost("actualizar")]
        public ActionResult ClienteUpd(Cliente cliente)
        {
            try
            {
                SqlConnection conexion = (SqlConnection)_context.Database.GetDbConnection();
                SqlCommand comando = conexion.CreateCommand();

                conexion.Open();
                comando.CommandType = CommandType.StoredProcedure;
                comando.CommandText = "APP_UPD_CLIENTE";

                comando.Parameters.Add("@usuario", SqlDbType.Int).Value = cliente.CLI_USUCVE;
                comando.Parameters.Add("@cliente", SqlDbType.BigInt).Value = cliente.CLI_CLAVE;
                comando.Parameters.Add("@rfc", SqlDbType.VarChar, 20).Value = cliente.CLI_RFC;
                comando.Parameters.Add("@nombre", SqlDbType.VarChar, 255).Value = cliente.CLI_NOMBRE;
                comando.Parameters.Add("@fiel", SqlDbType.VarChar, 50).Value = cliente.CLI_FIEL;
                comando.Parameters.Add("@key", SqlDbType.VarChar, 50).Value = cliente.CLI_KEY;
                comando.Parameters.Add("@password", SqlDbType.VarChar, 50).Value = cliente.CLI_PASSWORD;

                int liResultado = comando.ExecuteNonQuery();
                conexion.Close();

                return Ok(liResultado);
            }
            catch (Exception error)
            {
                return BadRequest("Errors: " + error.Message);
            }
        }

        // PUT: api/Cliente/5        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCliente(int id, Cliente poCliente)
        {
            if (id != poCliente.CLI_CLAVE)
            {
                return BadRequest();
            }

            _context.Entry(poCliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteCliente(int id)
        //{
        //    var cliente = await _context.Cliente.FindAsync(id);
        //    if (cliente == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Cliente.Remove(cliente);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        [HttpDelete("{usuario}, {cliente}")]
        public IActionResult DeleteCliente(int usuario, long cliente)
        {
            try
            {
                SqlConnection conexion = (SqlConnection)_context.Database.GetDbConnection();
                SqlCommand comando = conexion.CreateCommand();
                
                conexion.Open();
                comando.CommandType = CommandType.StoredProcedure;
                comando.CommandText = "APP_DEL_CLIENTE";
                comando.Parameters.Add("@usuario", SqlDbType.Int).Value = usuario;
                comando.Parameters.Add("@cliente", SqlDbType.BigInt).Value = cliente;
                
                int liResultado = comando.ExecuteNonQuery();
                conexion.Close();
                
                return Ok(liResultado);
            }
            catch
            {
                return BadRequest("Errors.");
            }
        }

        private bool ClienteExists(int id)
        {
            return _context.Cliente.Any(e => e.CLI_CLAVE == id);
        }
    }
}
