using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class PagninationHeader
    {
        public PagninationHeader()
        {
        }

        public int CurrentPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }
}