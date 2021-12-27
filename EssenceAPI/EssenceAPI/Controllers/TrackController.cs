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

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(repo.GetTracks());
        }
        

        [HttpDelete("{userId}/{trackId}")]
        public IActionResult Delete(string userId, string trackId)
        {
            try
            {                
                return Ok(repo.DeleteTrack(userId, trackId));
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
                return Ok(repo.AddTrack(track));
            }
            catch (Exception)
            {
                return StatusCode(500, "Something went wrong");
            }
        }
    }
}
