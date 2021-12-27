using EssenceAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EssenceAPI.Repository
{
    public interface ITrackRepository
    {
        List<Track> GetTracks();
        int DeleteTrack(string userId, string trackId);
        int AddTrack(Track track);
    }
}
