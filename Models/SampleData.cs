using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using manualUploader.Models;

namespace manualUploader.Models
{
    public class SampleData
    {
        public static void Initialize(TableContext context)
        {
            if (!context.UserTables.Any())
            {
                context.UserTables.AddRange(
                    new UploadedTable
                    {
                        col1 = "111",
                        col2 = "Apple",
                        col3 = "600",
                        col4 = "123",
                        col5 = "yyy"
                    },
                   new UploadedTable
                   {
                       col1 = "222",
                       col2 = "samsung",
                       col3 = "200",
                       col4 = "234",
                       col5 = "xxx"
                   }
                );
                context.SaveChanges();
            }
        }
    }
}
