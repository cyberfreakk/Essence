using AuthUserAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthUserAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDbContext db;

        public UserRepository(UserDbContext db)
        {
            this.db = db;
        }

        public User Login(string userid, string password)
        {
            return db.Users.Where(x => x.UserId == userid && x.Password == password).FirstOrDefault();
        }

        public int Register(User user)
        {
            db.Users.Add(user);
            return db.SaveChanges();
        }
    }
}
