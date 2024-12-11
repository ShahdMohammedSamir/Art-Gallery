using ArtGalleryFinal.Interfaces;
using ArtGalleryFinal.Models;
using Microsoft.AspNetCore.Identity; // For password hashing
using System.Linq;
using System.Threading.Tasks;

namespace ArtGalleryFinal.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly PasswordHasher<Users> _passwordHasher; 

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _passwordHasher = new PasswordHasher<Users>(); 
        }

       
        public async Task<Users> GetUserByIdAsync(int id) => await _userRepository.GetUserByIdAsync(id);
        public async Task<IEnumerable<Users>> GetAllUsersAsync() => await _userRepository.GetAllUsersAsync();

        public async Task AddUserAsync(Users user)
        {
            // Hash the password before saving to the database
            user.Password = _passwordHasher.HashPassword(user, user.Password);
            await _userRepository.AddUserAsync(user);
        }
        public async Task UpdateUserAsync(Users user) => await _userRepository.UpdateUserAsync(user);

        public async Task DeleteUserAsync(int id) => await _userRepository.DeleteUserAsync(id);
        public async Task<Users> AuthenticateAsync(string email, string password)
        {
           
            var user = await _userRepository.GetAllUsersAsync();
            var foundUser = user.FirstOrDefault(u => u.Email == email);
            if (foundUser == null)
                return null;

       
            var result = _passwordHasher.VerifyHashedPassword(foundUser, foundUser.Password, password);
            if (result == PasswordVerificationResult.Failed)
                return null;

            return foundUser; 
        }
    }
}
