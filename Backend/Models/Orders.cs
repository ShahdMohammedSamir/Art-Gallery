namespace ArtGalleryFinal.Models
{
    public class Orders
    {
        public int Id { get; set; } 
        public int UserId { get; set; } 
        public int ProductId { get; set; } 
  
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public int Amount { get; set; }  
        public int Price { get; set; }   
    
        public Users User { get; set; }
        public Products Product { get; set; }
    }
}
