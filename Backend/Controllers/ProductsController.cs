using ArtGalleryFinal.Interfaces;
using ArtGalleryFinal.Models;
using ArtGalleryFinal.Repository;
using ArtGalleryFinal.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtGalleryFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IPhotoServices _photoService;

        public ProductsController(IProductRepository productRepository, IPhotoServices photoService)
        {
            _productRepository = productRepository;
            _photoService = photoService;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Products>>> GetProducts()
        {
            var products = await _productRepository.GetAllProductsAsync();
            return Ok(products);
        }

        // GET: api/products/5
     
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProduct(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);

            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            return Ok(product);
        }
        [HttpGet("related")]
        public async Task<IActionResult> GetRelatedProducts(string category, string subCategory, int exclude)
        {
            var products = await _productRepository.Products
                .Where(p => p.Category == category && p.SubCategory == subCategory && p.Id != exclude)
                .ToListAsync();

            if (products == null || !products.Any())
                return NotFound("No related products found.");

            return Ok(products);
        }


        // POST: api/products
        [HttpPost]
        public async Task<IActionResult> PostProduct([FromForm] AddPhotoViewModel productViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Validation errors
            }

            // Handling Image Upload
            var uploadResult = await _photoService.AddImageAsync(productViewModel.Image);
            if (uploadResult.StatusCode != System.Net.HttpStatusCode.OK)
            {
                return BadRequest("Image upload failed.");
            }

            // Map the view model to the product model
            var product = new Products
            {
                Name = productViewModel.Name,
                Price = productViewModel.Price,
                Category = productViewModel.Category,
                SubCategory = productViewModel.SubCategory,
                Image = uploadResult.Url.ToString(),
                Width = productViewModel.Width,
                Height = productViewModel.Height,
                Description = productViewModel.Description,
            };

            // Save the product to the database
            await _productRepository.AddProductAsync(product);

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // PUT: api/products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Products product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            await _productRepository.UpdateProductAsync(product);

            return NoContent();
        }

        // DELETE: api/products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            await _productRepository.DeleteProductAsync(id);

            return NoContent();
        }
    }
}
