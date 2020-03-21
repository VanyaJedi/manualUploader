using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using manualUploader.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
//using Newtonsoft.Json;
using System.Text.Json;

namespace manualUploader.Controllers
{
    public class HomeController : Controller
    {
        TableContext db;
        public HomeController(TableContext context)
        {
            db = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult SingleFile(IFormFile file) 
        {
            var tableData = new List<UploadedTable>();
            using (StreamReader sr = new StreamReader(file.OpenReadStream())) 
            {
                string[] headers = sr.ReadLine().Split(',');
                while (!sr.EndOfStream)
                {
                    string[] cols = sr.ReadLine().Split(',');

                    tableData.Add(new UploadedTable
                    {
                        col1 = cols[0].ToString(),
                        col2 = cols[0].ToString(),
                        col3 = cols[0].ToString(),
                        col4 = cols[0].ToString(),
                        col5 = cols[0].ToString()
                    });
                }
            }

            foreach (var t in tableData) 
            {
                db.Add(t);
            }
            db.SaveChanges();

            return RedirectToAction("Index");
        }

        public IActionResult Table(int page, int size)
        {
            ViewBag.sizeItems = size;
            ViewBag.pageNum = page;
            int skip = page - 1;
            float pagesCount = db.UserTables.ToList().Count / (float) size;
            ViewBag.pagesCount = Math.Ceiling(pagesCount);
            return View(db.UserTables.ToList().Skip(skip * size).Take(size));
        }

        public string RetrieveData(int page, int size)
        {
            int skip = page - 1;
            var result = db.UserTables.ToList().Skip(skip * size).Take(size);
            return JsonSerializer.Serialize(result);
        }
    }
}

