namespace ArtGalleryFinal.ViewModels
{
    public class OrderDTO
    {
        public int Id {  get; set; }
        public string UserName { get; set; }
        public string Phone { get; set; }
        public string ProductName { get; set; }
        public int ProductId {  get; set; }
        public string Photo {  get; set; }
        public int Amount { get; set; } = 1;
        public int Price { get; set; }
        public int UserId {  get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
    }
}
