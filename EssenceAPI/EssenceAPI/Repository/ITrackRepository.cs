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
        void DeleteTrack(string userId, string trackId);
        void AddTrack(Track track);
        List<Track> GetPlaylist(string userId, string playlistName);
        Playlists AddPlaylists(string userId, string playlistName, Track track);
        void DeleteTrackPlaylist(string userId, string playlistName, string trackId);
    }
}
