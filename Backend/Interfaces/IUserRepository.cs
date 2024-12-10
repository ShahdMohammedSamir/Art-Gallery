using ArtGalleryFinal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArtGalleryFinal.Interfaces
{
    public interface IUserRepository
    {
        Task<Users> GetUserByIdAsync(int id);
        Task<IEnumerable<Users>> GetAllUsersAsync();
        Task AddUserAsync(Users user); 
        Task UpdateUserAsync(Users user); 
        Task DeleteUserAsync(int id); 
        Task<Users> AuthenticateAsync(string email, string password); 
    }
}
