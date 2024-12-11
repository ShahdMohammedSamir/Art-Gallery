using ArtGalleryFinal.Models;

namespace ArtGalleryFinal.ViewModels
{
    public class EditPhotoViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public IFormFile Image { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public string Description { get; set; }

        // Relationships
        public ICollection<Orders> Orders { get; set; }
    }
}
