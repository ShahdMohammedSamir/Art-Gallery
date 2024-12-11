using ArtGalleryFinal.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace ArtGalleryFinal.Services
{

    public class PhotoService : IPhotoServices
    {
        private readonly Cloudinary _cloud;

        public PhotoService(Cloudinary cloudinary)
        {
            _cloud = cloudinary;
        }

        public async Task<ImageUploadResult> AddImageAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Gravity("face").Crop("fill")
                };
                uploadResult = await _cloud.UploadAsync(uploadParams);
            }
            return uploadResult;
        }

        public async Task<DeletionResult> DeleteImageAsync(string publicId)
        {
            var deletionParams = new DeletionParams(publicId);
            var result = await _cloud.DestroyAsync(deletionParams);
            return result;
        }
    }
}
