using ArtGalleryFinal.Data;
using ArtGalleryFinal.Interfaces;
using ArtGalleryFinal.Models;
using Microsoft.EntityFrameworkCore;

namespace ArtGalleryFinal.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly DBcontextApp _context;

        public ProductRepository(DBcontextApp context)
        {
            _context = context;
        }

        // Return IQueryable<Products> for querying in the controller
        public IQueryable<Products> Products => _context.Products;

        public async Task<IEnumerable<Products>> GetAllProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Products> GetProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task AddProductAsync(Products product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(Products product)
        {
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}
