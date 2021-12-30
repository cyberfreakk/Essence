using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EssenceAPI.Models
{
    public class AppDbContext
    {
        //public AppDbContext(DbContextOptions options) : base(options)
        //{
        //    Database.EnsureCreated();
        //}
        //public DbSet<Track> Tracks { get; set; }
        //public DbSet<Playlists> Playlists { get; set; }
        MongoClient client;
        IMongoDatabase db;

        public AppDbContext(IConfiguration config)
        {

            client = new MongoClient(config.GetConnectionString("MongoDBConnection"));
            db = client.GetDatabase(config.GetSection("MongoDatabase").Value);
        }

        public IMongoCollection<Track> Tracks => db.GetCollection<Track>("Tracks");
        public IMongoCollection<Playlists> Playlists => db.GetCollection<Playlists>("Playlists");
    }
}
