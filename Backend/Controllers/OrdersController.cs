using ArtGalleryFinal.Interfaces;
using ArtGalleryFinal.Models;
using ArtGalleryFinal.Repository;
using ArtGalleryFinal.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace ArtGalleryFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersRepository _repository;
        private readonly IProductRepository _Prorepository;
        private readonly IUserRepository _Userepository;

        public OrdersController(IOrdersRepository repository, IProductRepository Prorepository, IUserRepository Userepository)
        {
            _repository = repository;
            _Prorepository = Prorepository;
            _Userepository = Userepository;
        }

        [HttpGet("GetAllOrders")]
        public async Task<IActionResult> GetAllOrdersAsync()
        {
            var allOrders = await _repository.GetAllOrdersAsync();
            return Ok(allOrders);
        }
    

        [HttpGet("GetPendingOrders/{userId}")]
        public async Task<IActionResult> GetPendingOrdersAsync(int userId)
        {
            var pendingOrders = await _repository.GetPendingOrdersAsync(userId);
            return Ok(pendingOrders);
        }

        [HttpGet("GetOrderById/{id}")]
        public async Task<IActionResult> GetOrderByIdAsync(int id)
        {
            var order = await _repository.GetOrderByIdAsync(id);
            if (order == null)
                return NotFound($"Order with ID {id} not found.");

            return Ok(order);
        }

       
        [HttpPost("AddOrder")]
        public async Task<IActionResult> AddOrderAsync([FromBody] OrderDTO orderData)
        {
            if (orderData == null)
                return BadRequest("Order data is null.");

            // Map OrderDTO to Orders model
            var order = new OrderDTO
            {
                UserId = orderData.UserId,
                ProductId = orderData.ProductId,
                Date = DateTime.UtcNow,
                Status = "0", 
            };

            try
            {
                var pendingOrders = await _repository.GetPendingOrdersAsync(orderData.UserId);

                var existingOrder = pendingOrders.FirstOrDefault(o => o.ProductId == orderData.ProductId);

                if (existingOrder != null)
                {
               
                    await _repository.UpdateOrderAsync(existingOrder);
                }

                else
                {
                    
                    await _repository.AddOrderAsync(order);
                }

                return Ok(new { Message = "Order added successfully!" });
            }
            catch (Exception ex)
            {
              
                return StatusCode(500, new { Message = "An error occurred while adding the order.", Details = ex.Message });
            }
        }



        [HttpDelete("DeleteOrder/{id}")]
        public async Task<IActionResult> DeleteOrderAsync(int id)
        {
            var order = await _repository.GetOrderByIdAsync(id);
            if (order == null)
                return NotFound($"Order with ID {id} not found.");

            await _repository.DeleteOrderAsync(id);
            return Ok(new { Message = "Order deleted successfully!" });
        }

        [HttpPut("UpdateStatus/{UserId}")]
        public async Task<IActionResult> UpdateStatusAsync(int UserId)
        {
           

            await _repository.UpdateStatusAsync(UserId);
            return Ok(new { Message = "Order status updated to 1." });
        }

        [HttpGet("GetOrdersByUserId/{userId}")]
        public async Task<IActionResult> GetOrdersByUserIdAsync(int userId)
        {
            var userOrders = await _repository.GetOrdersByUserIdAsync(userId);

            if (userOrders == null)
                return NotFound($"No orders found for user with ID {userId}.");

            return Ok(userOrders);
        }

        [HttpPut("UpdateCartQuantity")]
        public async Task<IActionResult> UpdateCartQuantity([FromBody] UpdateCartDTO request)
        {
            
            var success = await _repository.UpdateCartQuantityAsync(request.NewAmount, request.OrderId);

            if (!success)
                return NotFound(new { Success = false, Message = "Order not found." });

            return Ok(new { Success = true, Message = "Cart updated successfully!" });
        }


    }
}
