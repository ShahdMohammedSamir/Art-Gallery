using CloudinaryDotNet.Actions;

namespace ArtGalleryFinal.Interfaces
{
    public interface IPhotoServices
    {
        Task<ImageUploadResult> AddImageAsync(IFormFile file);
        Task<DeletionResult> DeleteImageAsync(string publicId);
    }
}
