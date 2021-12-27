using EssenceAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EssenceAPI.Repository
{
    public class TrackRepository : ITrackRepository
    {
        private readonly AppDbContext db;
        public TrackRepository(AppDbContext _db)
        {
            db = _db;
        }

        public int AddTrack(Track track)
        {
            db.Tracks.Add(track);
            return db.SaveChanges();
        }

        public int DeleteTrack(string userId, string trackId)
        {
            var res = db.Tracks.Where(x => x.userId == userId && x.trackId == trackId).FirstOrDefault();
            db.Tracks.Remove(res);
            return db.SaveChanges();
        }

        public List<Track> GetTracks()
        {
            return db.Tracks.ToList();
        }

    }
}
