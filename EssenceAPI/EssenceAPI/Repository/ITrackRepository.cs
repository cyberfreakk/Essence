using EssenceAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EssenceAPI.Repository
{
    public interface ITrackRepository
    {
        List<Track> GetTracks(string userId);
        bool DeleteTrack(string userId, string trackId);
        void AddTrack(Track track);
        List<Track> GetPlaylist(string userId, string playlistName);
        Playlists AddPlaylists(string userId, string playlistName, Track track);
        bool DeleteTrackPlaylist(string userId, string playlistName, string trackId);
        List<string> GetPlaylists(string userId);
        bool DeletePlaylist(string userId, string playlistName);
    }
}
