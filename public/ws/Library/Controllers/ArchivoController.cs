using System;
using System.IO;
using System.Collections;

using Microsoft.AspNetCore.Mvc;
using Library.Data;
using Library.Models;
using Microsoft.CodeAnalysis.Elfie.Model.Tree;
using System.Reflection;
using System.Diagnostics;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArchivoController : Controller
    {
        private readonly LibraryContext _context;

        public ArchivoController(LibraryContext context)
        {
            _context = context;
        }

        [HttpGet("Archivos")]
        //public IActionResult Archivos(int piUsuario, long plCliente, int piAno, int piMes)
        public IActionResult Archivos()
        {
            try
            {
                // HACER BUQUEDA DE ARCHIVOS EN CARPETA DEL HOSTING  FILE IO

                string executingPath = Directory.GetCurrentDirectory();
                string lsPath = executingPath + @"\facturas\";
                int liContador = 1;

                List<Archivo> lstArchivos = new List<Archivo>();

                if (Directory.Exists(lsPath))
                {
                    string[] fileEntries = Directory.GetFiles(lsPath, "*.xml");
                    foreach (string fileName in fileEntries)
                    {
                        Archivo archivo = new Archivo();
                        archivo.ARC_ID = liContador;
                        archivo.ARC_NOMBRE = Path.GetFileName(fileName);   // fileName;
                        lstArchivos.Add(archivo);
                        liContador++;
                    }
                }


                //if (File.Exists(path))
                //{
                //    // This path is a file
                //    ProcessFile(path);
                //}


                //string[] files = Directory.GetFiles(dir);

                //for (int iFile = 0; iFile < files.Length; iFile++)
                //    string fn = new FileInfo(files[iFile]).Name;


                //string[] files = new DirectoryInfo(dir).GetFiles().Select(o => o.Name).ToArray();


                return Ok(lstArchivos);
            }
            catch
            {
                return BadRequest("Errors.");
            }
        }


        [HttpPost("Identificarse")]        
        public IActionResult Identificarse()
        {
            try
            {
                // CONECTARSE HACIENDA SAT
                // cargar archivos de fiel.cer y llave.key


                return Ok();
            }
            catch
            {
                return BadRequest("Errors.");
            }
        }

        [HttpPost("HacerPeticion")]
        public IActionResult HacerPeticion()
        {
            try
            {
                // Peticion

                return Ok();
            }
            catch
            {
                return BadRequest("Errors.");
            }
        }

        [HttpPost("BajarArchivo")]
        public IActionResult BajarArchivo()
        {
            try
            {
                // Checar y Bajar Archivo

                return Ok();
            }
            catch
            {
                return BadRequest("Errors.");
            }
        }

        [HttpPost("DescomprimirArchivo")]
        public IActionResult DescomprimirArchivo()
        {
            try
            {
                // Descomprimir Archivo ZIP

                return Ok();
            }
            catch
            {
                return BadRequest("Errors.");
            }
        }

    }
}
