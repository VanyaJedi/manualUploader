using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using manualUploader.Models;

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
            return View(db.UserTables.ToList());
        }
        public IActionResult Table()
        {
            return View();
        }
    }
}

