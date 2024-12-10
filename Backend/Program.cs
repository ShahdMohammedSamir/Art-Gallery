
using ArtGalleryFinal.Data;
using ArtGalleryFinal.Helpers;
using ArtGalleryFinal.Interfaces;
using ArtGalleryFinal.Repositories;
using ArtGalleryFinal.Repository;
using ArtGalleryFinal.Services;
using CloudinaryDotNet;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ArtGalleryFinal
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddScoped<IProductRepository, ProductRepository>();
            builder.Services.AddScoped<IPhotoServices, PhotoService>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<UserService>();
            builder.Services.AddScoped<IOrdersRepository, OrdersRepository>();


            // Add CORS Policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            // Configure Database Context
            builder.Services.AddDbContext<DBcontextApp>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    sqlOptions => sqlOptions.EnableRetryOnFailure(
                        maxRetryCount: 5,
                        maxRetryDelay: TimeSpan.FromSeconds(10),
                        errorNumbersToAdd: null
                    )
                )
            );
            builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));

            builder.Services.AddSingleton(provider =>
            {
                var config = provider.GetRequiredService<IOptions<CloudinarySettings>>().Value;
                return new Cloudinary(new Account(config.CloudName, config.ApiKey, config.ApiSecret));
            });

            builder.Services.AddScoped<IPhotoServices, PhotoService>();


            builder.Services.AddSingleton(provider =>
            {
                var config = provider.GetRequiredService<IOptions<CloudinarySettings>>().Value;
                return new Cloudinary(new Account(config.CloudName, config.ApiKey, config.ApiSecret));
            });

            // Add Controllers and Swagger
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Enable Swagger in Development
            if (app.Environment.IsDevelopment()||app.Environment.IsProduction())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Middleware Pipeline
            app.UseHttpsRedirection();
            app.UseCors("AllowAll"); 
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
