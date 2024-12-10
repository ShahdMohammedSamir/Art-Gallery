using System.ComponentModel.DataAnnotations.Schema;

namespace ArtGalleryFinal.Models
{
    public class Users
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public string Email { get; set; }

        // The hashed password will be stored here
        public string Password { get; set; }
        public string Phone { get; set; }
        public ICollection<Orders> Orders { get; set; }
    
}
}
