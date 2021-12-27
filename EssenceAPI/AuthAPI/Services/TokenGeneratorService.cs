using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AuthUserAPI.Services
{
    public class TokenGeneratorService : ITokenGeneratorService
    {
        public string GenerateJWTToken(string firstName, string lastName, string userid, string password, string contact, string emailId)
        {
            var claims = new[]
            {
                new Claim("userid", userid),
                new Claim("password", password),
                new Claim("firstName", firstName),
                new Claim("lastName", lastName),
                new Claim("phone", contact),
                new Claim("emailId", emailId)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this_is_my_secret_key"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "AuthApi",
                audience: "EssenceApi",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            var response = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            };

            return JsonConvert.SerializeObject(response);
        }
    }
}
