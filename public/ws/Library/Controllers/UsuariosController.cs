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
using Microsoft.IdentityModel.Tokens;
using System.Data;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : Controller
    {
        private readonly LibraryContext _context;

        public UsuariosController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuario()
        {
            return await _context.Usuario.ToListAsync();
        }

        [HttpGet("login")]
        public IActionResult Login(string psCorreo, string psPassword)
        {
            try
            {
                SqlConnection conexion = (SqlConnection)_context.Database.GetDbConnection();
                SqlCommand comando = conexion.CreateCommand();
                conexion.Open();
                comando.CommandType = CommandType.StoredProcedure;
                comando.CommandText = "APP_LST_LOGIN";
                comando.Parameters.Add("@correo", SqlDbType.VarChar, 50).Value = psCorreo;
                comando.Parameters.Add("@password", SqlDbType.VarChar, 20).Value = psPassword;
                SqlDataReader reader = comando.ExecuteReader();

                List<Usuario> lstUsuarios = new List<Usuario>();

                while (reader.Read())
                {
                    Usuario loUsuario = new Usuario();
                    loUsuario.USU_CLAVE = reader.GetInt32("USU_CLAVE");
                    loUsuario.USU_NOMBRE = reader.GetString("USU_NOMBRE");
                    loUsuario.USU_PLAN = reader.GetInt32("USU_PLAN");
                    lstUsuarios.Add(loUsuario);
                }

                conexion.Close();

                return Ok(lstUsuarios);
            }
            catch(Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }

        [HttpGet("usuario")]
        public IActionResult Usuarios(int piUsuario)
        {
            try
            {
                SqlConnection conexion = (SqlConnection)_context.Database.GetDbConnection();
                SqlCommand comando = conexion.CreateCommand();
                conexion.Open();
                comando.CommandType = CommandType.StoredProcedure;
                comando.CommandText = "APP_LST_USUARIO";
                comando.Parameters.Add("@usuario", SqlDbType.Int).Value = piUsuario;
                 SqlDataReader reader = comando.ExecuteReader();

                List<Usuario> lstUsuarios = new List<Usuario>();

                while (reader.Read())
                {
                    Usuario loUsuario = new Usuario();
                    loUsuario.USU_CLAVE = reader.GetInt32("USU_CLAVE");
                    loUsuario.USU_NOMBRE = reader.GetString("USU_NOMBRE");
                    loUsuario.USU_CORREO = reader.GetString("USU_CORREO");                    
                    loUsuario.USU_PASSWORD = reader.GetString("USU_PASSWORD");
                    loUsuario.USU_PLAN = reader.GetInt32("USU_PLAN");
                    loUsuario.USU_REGISTRO = reader.GetDateTime("USU_REGISTRO");
                    lstUsuarios.Add(loUsuario);
                }

                conexion.Close();

                return Ok(lstUsuarios);
            }
            catch
            {
                return BadRequest("Errors.");
            }
        }

        // PUT: api/Usuario/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Usuario poUsuario)
        {
            if (id != poUsuario.USU_CLAVE)
            {
                return BadRequest();
            }

            _context.Entry(poUsuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        private bool UserExists(int id)
        {
            return _context.Usuario.Any(e => e.USU_CLAVE == id);
        }

    }
}
