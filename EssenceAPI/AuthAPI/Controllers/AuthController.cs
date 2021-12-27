using AuthUserAPI.Models;
using AuthUserAPI.Repository;
using AuthUserAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository repo;
        private readonly ITokenGeneratorService service;
        public AuthController(IUserRepository repo, ITokenGeneratorService service)
        {
            this.repo = repo;
            this.service = service;
        }

        [HttpPost("register")]
        public IActionResult Post(User user)
        {
            return Ok(repo.Register(user));
        }

        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            var u = repo.Login(user.UserId, user.Password);
            if (u == null)
            {
                return StatusCode(401, "Invalid Credentials!");
            }
            else
            {
                return Ok(service.GenerateJWTToken(u.firstName, u.lastName, user.UserId, user.Password, u.Contact, u.emailId));
            }
        }


    }
}
