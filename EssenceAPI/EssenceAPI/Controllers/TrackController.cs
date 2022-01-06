using EssenceAPI.Models;
using EssenceAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EssenceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackController : ControllerBase
    {
        private readonly ITrackRepository repo;

        public TrackController(ITrackRepository _repo)
        {
            repo = _repo;
        }

        [HttpGet("{userId}")]
        public IActionResult GetTrack(string userId)
        {
            return Ok(repo.GetTracks(userId));
        }

        [HttpGet("{userId}/{playlistName}")]
        public IActionResult GetPlaylist(string userId, string playlistName)
        {
            return Ok(repo.GetPlaylist(userId, playlistName));
        }

        [HttpGet]
        [Route("getPlaylists/{userId}")]
        public IActionResult GetPlaylists(string userId)
        {
            return Ok(repo.GetPlaylists(userId));
        }

        [HttpPost]
        [Route("addPlaylist/{userId}/{playlistName}")]
        public IActionResult Post(string userId, string playlistName, Track track)
        {
            try
            {
                repo.AddPlaylists(userId, playlistName, track);
                return StatusCode(200);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }


        [HttpDelete("{userId}/{trackId}")]
        public IActionResult Delete(string userId, string trackId)
        {
            try
            {
                repo.DeleteTrack(userId, trackId);
                return StatusCode(200);
            }
            catch (Exception)
            {
                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpDelete]
        [Route("deleteTrackPlaylist/{userId}/{playlistName}/{trackId}")]
        public IActionResult DeleteTrackPlaylist(string userId, string playlistName, string trackId)
        {
            try
            {
                repo.DeleteTrackPlaylist(userId, playlistName, trackId);
                return StatusCode(200);
            }
            catch (Exception)
            {
                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpDelete]
        [Route("deletePlaylist/{userId}/{playlistName}")]
        public IActionResult DeletePlaylist(string userId, string playlistName)
        {
            try
            {
                repo.DeletePlaylist(userId, playlistName);
                return StatusCode(200);
            }
            catch (Exception)
            {
                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpPost]
        public IActionResult Post(Track track)
        {
            try
            {
                repo.AddTrack(track);
                return StatusCode(200);
            }
            catch (Exception)
            {
                return StatusCode(500, "Something went wrong");
            }
        }
    }
}
