using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthUserAPI.Models
{
    public class User
    {
        public string UserId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string Password { get; set; }
        public string Contact { get; set; }
        public string emailId { get; set; }
    }
}
