using System;
using System.IO;
using System.Collections;
using System.Reflection;
using System.Diagnostics;
using System.Security.Cryptography.X509Certificates;
using System.Web;

using Library.Data;
using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Model.Tree;

using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;

using System.Net;
using System.Runtime.ConstrainedExecution;
using System.IO.Compression;
using Microsoft.IdentityModel.Tokens;

using ServiceReference1;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArchivoController : Controller
    {
        private readonly LibraryContext _context;

        string urlAutentica = "https://cfdidescargamasivasolicitud.clouda.sat.gob.mx/Autenticacion/Autenticacion.svc";
        string urlAutenticaAction = "http://DescargaMasivaTerceros.gob.mx/IAutenticacion/Autentica";

        string urlSolicitud = "https://cfdidescargamasivasolicitud.clouda.sat.gob.mx/SolicitaDescargaService.svc";
        string urlSolicitudAction = "http://DescargaMasivaTerceros.sat.gob.mx/ISolicitaDescargaService/SolicitaDescarga";

        string urlVerificarSolicitud = "https://cfdidescargamasivasolicitud.clouda.sat.gob.mx/VerificaSolicitudDescargaService.svc";
        string urlVerificarSolicitudAction = "http://DescargaMasivaTerceros.sat.gob.mx/IVerificaSolicitudDescargaService/VerificaSolicitudDescarga";

        string urlDescargarSolicitud = "https://cfdidescargamasiva.clouda.sat.gob.mx/DescargaMasivaService.svc";
        string urlDescargarSolicitudAction = "http://DescargaMasivaTerceros.sat.gob.mx/IDescargaMasivaTercerosService/Descargar";

        public ArchivoController(LibraryContext context)
        {
            _context = context;
        }

        [HttpGet("Archivos")]
        //public IActionResult Archivos(int piUsuario, long plCliente, int piAno, int piMes)
        public IActionResult Archivos(int usuario, string cliente, string paquete)
        {
            try
            {
                // HACER BUQUEDA DE ARCHIVOS EN CARPETA DEL HOSTING  FILE IO
                string executingPath = Directory.GetCurrentDirectory();
                string lsUsuario = "1";
                string lsCliente = "IATG9306278W9";
                string lsPaquete = "84FC3A97-21DC-459D-BBBB-E6193304DF9D_01";
                string lsPath = executingPath + @"\facturas\" + "usuario_" + lsUsuario + @"\" + lsCliente + @"\" + lsPaquete + @"\";

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

        [HttpPost("SatSolicitudDescarga")]
        public IActionResult SatSolicitudDescarga(SolicitudEntrada solicitudEntrada)
        {
            string RfcEmisor = solicitudEntrada.SOL_RFC_EMISOR; // "IATG9306278W9";
            string RfcReceptor = solicitudEntrada.SOL_RFC_RECEPTOR;
            string FechaInicial = solicitudEntrada.SOL_FECHA_INICIAL.ToString("yyyy-MM-dd"); //"2023-02-01";
            string FechaFinal = calcularFecha(solicitudEntrada.SOL_FECHA_FINAL);

            try
            {
                X509Certificate2 certificate = crearCertificado();
                string autorizacion = this.SatAutenticacion(certificate);

                if (autorizacion.IsNullOrEmpty() == false)
                {
                    // Solicitud de descarga masiva                
                    Solicitud solicitud = new Solicitud(this.urlSolicitud, this.urlSolicitudAction);
                    string xmlSolicitud = solicitud.Generate(certificate, RfcEmisor, RfcReceptor, RfcEmisor, FechaInicial, FechaFinal, "CFDI");
                    solicitudEntrada.SOL_CODIGO = solicitud.Send(autorizacion);
                    Console.WriteLine("IdSolicitud: " + solicitudEntrada.SOL_CODIGO);

                    return Ok(solicitudEntrada);
                }
            }
            catch
            {
                return BadRequest("Errors.");
            }

            return Ok();
        }

        private string calcularFecha(DateTime fecha)
        {
            DateTime calcular = fecha.AddMonths(1);            
            calcular = calcular.AddDays(-1);
            return calcular.ToString("yyyy-MM-dd");
        }

        private X509Certificate2 crearCertificado()
        {
            string gsCliente = "IATG9306278W9";
            string gsFiel = "iatg9306278w9.cer";
            string gsKey = "iatg9306278w9.key";
            string gsPassword = "rentas01";

            X509Certificate2 certificate;
            byte[] pfx;
            byte[] certBuffer = new byte[1024];
            byte[] keyBuffer = new byte[1024];

            string executingPath = Directory.GetCurrentDirectory();
            string lsPath = executingPath + @"\certificados\";
            string lsCertificadoPath = lsPath + gsCliente + @"\" + gsFiel;
            string lsLlavePath = lsPath + gsCliente + @"\" + gsKey;

            if (System.IO.File.Exists(lsCertificadoPath))
            {
                certBuffer = System.IO.File.ReadAllBytes(lsCertificadoPath);
            }

            if (System.IO.File.Exists(lsLlavePath))
            {
                keyBuffer = System.IO.File.ReadAllBytes(lsLlavePath);
            }

            pfx = CerKey2Pfx(certBuffer, keyBuffer, gsPassword);
            certificate = new X509Certificate2(pfx, gsPassword);

            return certificate;
        }

        private string SatAutenticacion(X509Certificate2 certificate)
        {
            try
            {
                // CONECTARSE HACIENDA SAT: cargar archivos de fiel.cer y llave.key
                string token = ObtenerToken(certificate);
                string autorization = String.Format("WRAP access_token=\"{0}\"", HttpUtility.UrlDecode(token));
                Console.WriteLine("Token: " + token);
                return autorization;
            }
            catch
            {
                return "";
            }
        }

        private string ObtenerToken(X509Certificate2 cert)
        {
            Autenticacion service = new Autenticacion(this.urlAutentica, this.urlAutenticaAction);
            string xml = service.Generate(cert);
            return service.Send();
        }

        public static byte[] CerKey2Pfx(byte[] cerText, byte[] keyText, string keyPass)
        {
            try
            {
                byte[] pfxBytes = null;

                var certificado = new X509Certificate2(cerText);
                var pllavePrivada = PrivateKeyFactory.DecryptKey(keyPass.ToCharArray(), keyText);

                var certificadoBC = new Org.BouncyCastle.X509.X509Certificate(DotNetUtilities.FromX509Certificate(certificado).CertificateStructure);
                var acertificadoBC = new X509CertificateEntry[1];
                acertificadoBC[0] = new X509CertificateEntry(certificadoBC);

                Pkcs12Store pfxStore = new Pkcs12StoreBuilder().Build();
                pfxStore.SetKeyEntry("", new AsymmetricKeyEntry(pllavePrivada), acertificadoBC);
                using (var pfxStream = new MemoryStream())
                {
                    pfxStore.Save(pfxStream, keyPass.ToCharArray(), new SecureRandom());
                    pfxBytes = pfxStream.ToArray();
                }

                var resultado = Pkcs12Utilities.ConvertToDefiniteLength(pfxBytes, keyPass.ToCharArray());

                return resultado;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return null;
            }
        }

        [HttpPost("SatVerificacionDescarga")]
        public IActionResult SatVerificacionDescarga(SolicitudEntrada solicitudEntrada)
        {
            string RfcEmisor = solicitudEntrada.SOL_RFC_EMISOR; // "IATG9306278W9";
            string idSolicitud = solicitudEntrada.SOL_CODIGO; // "0bceec31-48ba-41d7-a6d9-69ba22f1b2b7";

            try
            {
                X509Certificate2 certificate = crearCertificado();
                string autorizacion = SatAutenticacion(certificate);

                if (autorizacion.IsNullOrEmpty() == false)
                {
                    // Verificacion de Descarga Masiva
                    VerificaSolicitud verifica = new VerificaSolicitud(this.urlVerificarSolicitud, this.urlVerificarSolicitudAction);
                    string xmlVerifica = verifica.Generate(certificate, RfcEmisor, idSolicitud);
                    string idPaquete = verifica.Send(autorizacion);

                    if (idPaquete.IsNullOrEmpty() == false)
                    {
                        string response = this.SatDescargaMasiva(certificate, autorizacion, RfcEmisor, idPaquete);
                        if (response.IsNullOrEmpty() == false) 
                        {
                            GuardarSolicitud(RfcEmisor, idPaquete, response); 
                        }
                    }

                    return Ok(idPaquete);
                }
            }
            catch
            {
                return BadRequest("Errors.");
            }

            return Ok();
        }

        private string SatDescargaMasiva(X509Certificate2 certificate, string autorizacion, string rfcEmisor, string idPaquete)
        {
            try
            {
                // Bajar y Descomprimir Archivo ZIP
                DescargarSolicitud descargarSolicitud = new DescargarSolicitud(this.urlDescargarSolicitud, this.urlDescargarSolicitudAction);
                string xmlDescarga = descargarSolicitud.Generate(certificate, rfcEmisor, idPaquete);
                string response = descargarSolicitud.Send(autorizacion);

                return response;
            }
            catch
            {
                return "";
            }
        }

        private void GuardarSolicitud(string psCliente, string idPaquete, string descargaResponse)
        {
            string path = "./facturas/usuario_1/" + psCliente + "/";
            string filePath = path + idPaquete + ".zip";
            string pathExtract = path + idPaquete + "/";
            byte[] file = Convert.FromBase64String(descargaResponse);

            if (Directory.Exists(path) == false)
            {
                Directory.CreateDirectory(path);

                if (System.IO.File.Exists(filePath) == false)
                {
                    using (FileStream fs = System.IO.File.Create(filePath, file.Length))
                    {
                        fs.Write(file, 0, file.Length);
                    }

                    Console.WriteLine("FileCreated: " + filePath);

                    ZipFile.ExtractToDirectory(filePath, pathExtract);
                    Console.WriteLine("Unzip file: " + pathExtract);
                }
            }
        }

    }
}
