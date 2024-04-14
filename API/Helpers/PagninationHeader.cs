using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class PagninationHeader
    {
        public PagninationHeader(int CurrentPage, int ItemsPerPage, int TotalItems, int TotalPages)
        {
            CurrentPage = CurrentPage;
            ItemsPerPage = ItemsPerPage;
            TotalItems = TotalItems;
            TotalPages = TotalPages;
        }

        public int CurrentPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }
}