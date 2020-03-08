using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace manualUploader.Models
{
    public class TableContext : DbContext
    {
        public DbSet<UploadedTable> UserTables{ get; set; }
        public TableContext(DbContextOptions<TableContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
