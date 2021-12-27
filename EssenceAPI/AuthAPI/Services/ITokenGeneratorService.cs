using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthUserAPI.Services
{
    public interface ITokenGeneratorService
    {
        string GenerateJWTToken(string firstName, string lastName, string userid, string password, string contact, string emailId);

    }
}
