using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EssenceAPI.Models
{
    public class Playlist
    {
        [BsonId]
        public string playlistName { get; set; }
        public List<Track> playlist { get; set; }
    }
}
