using ArtGalleryFinal.Models;
using ArtGalleryFinal.ViewModels;

namespace ArtGalleryFinal.Interfaces
{
    public interface IOrdersRepository
    {
        Task<IEnumerable<OrderDTO>> GetAllOrdersAsync();
        Task<IEnumerable<OrderDTO>> GetPendingOrdersAsync(int userId);
        Task<IEnumerable<OrderDTO>> GetOrdersByUserIdAsync(int userId);
        Task<bool> UpdateCartQuantityAsync(int newAmount, int orderId);
        Task<OrderDTO> GetOrderByIdAsync(int id);
        Task AddOrderAsync(OrderDTO order);
        Task DeleteOrderAsync(int id);
        Task UpdateOrderAsync(OrderDTO order);
        Task UpdateStatusAsync(int id);
        Task SaveAsync();
    }
}
