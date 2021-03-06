using EssenceAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;

namespace EssenceAPI.Repository
{
    public class TrackRepository : ITrackRepository
    {
        private readonly AppDbContext db;
        public TrackRepository(AppDbContext _db)
        {
            db = _db;
        }

        public void AddTrack(Track track)
        {
            db.Tracks.InsertOne(track);
        }

        public bool DeleteTrack(string userId, string trackId)
        {
            db.Tracks.DeleteOne(x => x.userId == userId && x.trackId == trackId);
            return true;
        }

        public List<Track> GetTracks(string userId)
        {
            return db.Tracks.Find(x => x.userId == userId).ToList();
        }


        public Playlists AddPlaylists(string userId, string playlistName, Track track)
        {
            Playlists playlists = db.Playlists.Find(x => x.userId == userId).FirstOrDefault();
            if (playlists != null)
            {
                if (playlists.playlists == null)
                {
                    playlists.playlists = new List<Playlist>();
                    var val = new Playlist();
                    val.playlistName = playlistName;
                    val.playlist.Add(track);
                    playlists.playlists.Add(val);
                }
                else
                {
                    var res = playlists.playlists.Find(x => x.playlistName == playlistName);
                    if (res == null)
                    {
                        var val = new Playlist();
                        val.playlistName = playlistName;
                        val.playlist = new List<Track>();
                        val.playlist.Add(track);
                        playlists.playlists.Add(val);
                    }
                    else
                    {
                        res.playlist.Add(track);
                    }

                    var filter = Builders<Playlists>.Filter.Where(x => x.userId == userId);
                    db.Playlists.FindOneAndReplace(filter, playlists);
                    return playlists;
                }
            }
            Playlists playlists1 = new Playlists();
            playlists1.userId = userId;
            playlists1.playlists = new List<Playlist>();
            var data = new Playlist();
            data.playlistName = playlistName;
            data.playlist = new List<Track>();
            data.playlist.Add(track);
            playlists1.playlists.Add(data);
            db.Playlists.InsertOne(playlists1);
            return playlists1;
        }

        public List<Track> GetPlaylist(string userId, string playlistName)
        {
            Playlists playlists = db.Playlists.Find(x => x.userId == userId).FirstOrDefault();
            return playlists.playlists.Find(x => x.playlistName == playlistName).playlist;
        }

        public bool DeleteTrackPlaylist(string userId, string playlistName, string trackId)
        {
            Playlists playlists = db.Playlists.Find(x => x.userId == userId).FirstOrDefault();
            var res = playlists.playlists.Find(x => x.playlistName == playlistName);
            var val = res.playlist.Find(x => x.trackId == trackId);
            res.playlist.Remove(val);
            var filter = Builders<Playlists>.Filter.Where(x => x.userId == userId);
            db.Playlists.FindOneAndReplace(filter, playlists);
            return true;
        }

        public List<string> GetPlaylists(string userId)
        {
            Playlists playlists = db.Playlists.Find(x => x.userId == userId).FirstOrDefault();
            List<string> names = new List<string>();
            foreach (var item in playlists.playlists)
            {
                names.Add(item.playlistName);
            }
            return names;
        }

        public bool DeletePlaylist(string userId, string playlistName)
        {
            Playlists playlists = db.Playlists.Find(x => x.userId == userId).FirstOrDefault();
            var res = playlists.playlists.Find(x => x.playlistName == playlistName);
            playlists.playlists.Remove(res);
            var filter = Builders<Playlists>.Filter.Where(x => x.userId == userId);
            db.Playlists.FindOneAndReplace(filter, playlists);
            return true;
        }

    }
}
