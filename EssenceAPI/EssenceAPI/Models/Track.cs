using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EssenceAPI.Models
{
    public class Track
    {
        public string userId { get; set; }
        public string trackName { get; set; }
        public string trackId { get; set; }
        public string imageUrl { get; set; }
        public string audioUrl { get; set; }
    }
}
