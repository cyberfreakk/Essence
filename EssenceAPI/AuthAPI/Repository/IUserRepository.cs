using AuthUserAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthUserAPI.Repository
{
    public interface IUserRepository
    {
        int Register(User user);
        User Login(string userid, string password);
    }
}
