using ArtGalleryFinal.Models;

namespace ArtGalleryFinal.Interfaces
{
    public interface IProductRepository
    {
        IQueryable<Products> Products { get; }  // Return IQueryable<Products> for querying.

        Task<IEnumerable<Products>> GetAllProductsAsync();
        Task<Products> GetProductByIdAsync(int id);
        Task AddProductAsync(Products product);
        Task UpdateProductAsync(Products product);
        Task DeleteProductAsync(int id);
    }
}
