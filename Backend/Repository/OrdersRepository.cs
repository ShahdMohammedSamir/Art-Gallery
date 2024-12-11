using ArtGalleryFinal.Data;
using ArtGalleryFinal.Interfaces;
using ArtGalleryFinal.Models;
using ArtGalleryFinal.ViewModels;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArtGalleryFinal.Repository
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly DBcontextApp _context;

        public OrdersRepository(DBcontextApp context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrderDTO>> GetAllOrdersAsync()
        {
            return await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Product)
                .Select(o => new OrderDTO
                {
                    Id = o.Id,
                    UserName = o.User.Name,
                    UserId = o.User.Id,
                    ProductId = o.Product.Id,
                    Phone = o.User.Phone,
                    Photo = o.Product.Image,
                    Amount=o.Amount,
                    Price= (int)o.Product.Price,
                    ProductName = o.Product.Name,
                    Date = o.Date,
                    Status = o.Status
                })
                .ToListAsync();
        }

        public async Task UpdateOrderAsync(OrderDTO orderDto)
        {

            var order = await _context.Orders
             .FirstOrDefaultAsync(o => o.UserId == orderDto.UserId && o.ProductId == orderDto.ProductId);

            if (order != null)
            {
                order.Amount++;

            
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Order not found for the given user and product.");
            }

        }

        public async Task<IEnumerable<OrderDTO>> GetPendingOrdersAsync(int userId)
        {
            var orders = await _context.Orders
              .Where(o => o.UserId == userId && o.Status == "0")
              .Include(o => o.User)
              .Include(o => o.Product) 
              .ToListAsync();

            if (orders == null || !orders.Any())
                return new List<OrderDTO>();

            // Map Orders to OrderDTO
            return orders.Select(order => new OrderDTO
            {
                Id = order.Id,
                UserName = order.User.Name,
                Phone = order.User.Phone,
                UserId= userId,
                ProductId=order.ProductId,
                Photo = order.Product.Image,
                Amount = order.Amount,
                Price = (int)order.Product.Price,
                ProductName = order.Product.Name,
                Date = order.Date,
                Status = order.Status
            }).ToList();
        
    }

        public async Task<OrderDTO> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null) return null;

            return new OrderDTO
            {
                Id = order.Id,
                UserName = order.User.Name,
                Phone = order.User.Phone,
                Photo=order.Product.Image,
                Amount = order.Amount,
                Price = (int)order.Product.Price,
                ProductName = order.Product.Name,
                Date = order.Date,
                Status = order.Status
            };
        }

        public async Task<IEnumerable<OrderDTO>> GetOrdersByUserIdAsync(int userId)
        {
            
            var orders = await _context.Orders
                .Where(o => o.UserId == userId && o.Status == "1")
                .Include(o => o.User) 
                .Include(o => o.Product) 
                .ToListAsync();

 
            if (orders == null || !orders.Any())
                return new List<OrderDTO>();

            
            return orders.Select(order => new OrderDTO
            {
                Id = order.Id,
                UserName = order.User.Name,
                Phone = order.User.Phone,
                Photo = order.Product.Image,
                Amount = order.Amount,
                Price = (int)order.Product.Price,
                ProductName = order.Product.Name,
                Date = order.Date,
                Status = order.Status
            }).ToList(); 
        }



        public async Task AddOrderAsync(OrderDTO orderDTO)
        {
            
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == orderDTO.UserId);
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == orderDTO.ProductId);

            if (user == null || product == null)
                throw new ArgumentException("User or Product not found.");

           
            var order = new Orders
            {
                UserId = orderDTO.UserId, 
                ProductId = orderDTO.ProductId,
                Date = DateTime.UtcNow, 
                Amount = orderDTO.Amount,
                Price = (int)product.Price, 
                Status = "0" 
            };

          
            await _context.Orders.AddAsync(order);

            
            user.Orders.Add(order);
            product.Orders.Add(order);

     
            await SaveAsync();
        }

        public async Task DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == order.UserId);
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == order.ProductId);
            if (order != null)
            {
                _context.Orders.Remove(order);
                 user.Orders.Remove(order);
                 product.Orders.Remove(order);
                await SaveAsync();
            }
        }

        public async Task UpdateStatusAsync(int UserId)
        {
            var orders = await _context.Orders
      .Where(o => o.UserId == UserId && o.Status == "0") 
      .ToListAsync();

            foreach (var item in orders)
            {
                item.Status = "1"; 
            }

            await _context.SaveChangesAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
        public async Task<bool> UpdateCartQuantityAsync(int newAmount, int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);

            if (order == null)
                return false;

            order.Amount = newAmount;
            await _context.SaveChangesAsync();
            return true; 
        }

    }
}
