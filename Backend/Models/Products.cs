namespace ArtGalleryFinal.Models
{
    public class Products { 
     public int Id { get; set; }
    public string Name { get; set; }
    public string? Image { get; set; } 
    public decimal Width { get; set; }
    public decimal Height { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string SubCategory { get; set; }
    public decimal Price { get; set; }

    public ICollection<Orders> Orders { get; set; }
}
}
