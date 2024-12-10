using ArtGalleryFinal.Models;
using ArtGalleryFinal.Services;
using ArtGalleryFinal.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity; // Add this namespace for password hashing
using System.Linq;
using System.Threading.Tasks;

namespace ArtGalleryFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly PasswordHasher<Users> _passwordHasher;

        public UserController(UserService userService)
        {
            _userService = userService;
            _passwordHasher = new PasswordHasher<Users>(); // Initialize password hasher
        }

        // Get a single user by their ID asynchronously
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();

            return Ok(user);
        }

        // Get all users asynchronously
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        // Add a new user asynchronously
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] UserDto userDto)
        {
            if (userDto == null) return BadRequest("Invalid user data.");

            // Check if the email already exists in the database
            var existingUser = (await _userService.GetAllUsersAsync()).FirstOrDefault(u => u.Email == userDto.Email);
            if (existingUser != null)
            {
                return Conflict(new { Message = "Email is already in use." });
            }

            // Convert UserDto to Users
            var user = new Users
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Phone = userDto.Phone,
                Password = userDto.Password // Plain password before hashing
            };

            // Hash the password before saving it to the database
       

            await _userService.AddUserAsync(user);

            // Return the UserDto with the newly created user ID
            var createdUserDto = new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Phone = user.Phone,
                // You might want to exclude the password from the response for security
            };

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, createdUserDto);
        }

        // Update an existing user asynchronously
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] Users user)
        {
            if (id != user.Id) return BadRequest();

            await _userService.UpdateUserAsync(user);
            return NoContent();
        }

        // Delete a user by their ID asynchronously
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _userService.DeleteUserAsync(id);
            return NoContent();
        }

        // Login asynchronously
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginDto)
        {
            if (loginDto == null) return BadRequest("Invalid client request");

            // Authenticate the user using the provided email and password
            var user = await _userService.AuthenticateAsync(loginDto.Email, loginDto.Password);

            // If the authentication fails (user is null), return an Unauthorized response
            if (user == null)
                return Unauthorized(new { Message = "Invalid email or password" });

            // Return a success message and user data (exclude password for security)
            return Ok(new
            {
                Message = "Login successful",
                User = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.Phone
                }
            });
        }

        // Other actions like GetUserById, AddUser, etc.
    }
}
