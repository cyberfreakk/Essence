using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EssenceAPI.Models
{
    public class Playlists
    {
        [BsonId]
        public string userId { get; set; }
        public List<Playlist> playlists { get; set; }
    }
}
