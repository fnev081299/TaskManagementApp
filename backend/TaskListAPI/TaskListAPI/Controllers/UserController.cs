using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TaskListAPI.Data;
using TaskListAPI.Models;
using BCrypt.Net;

namespace TaskListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TaskContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public UserController(TaskContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
            {
                return BadRequest("Username already exists.");
            }

            user.PasswordHash = HashPassword(user.PasswordHash);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == loginRequest.Username);

            if (existingUser == null || !VerifyPassword(loginRequest.PasswordHash, existingUser.PasswordHash))
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok(existingUser);
        }

        [HttpGet("profilePicture")]
        public async Task<IActionResult> GetProfilePicture([FromQuery] int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null || string.IsNullOrEmpty(user.ProfilePictureFileName))
            {
                return NotFound("User or profile picture not found.");
            }

            var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "profile_pictures");
            var filePath = Path.Combine(uploadsFolder, user.ProfilePictureFileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Profile picture not found.");
            }

            var fileStream = System.IO.File.OpenRead(filePath);
            return File(fileStream, "image/jpeg");
        }

        [HttpPost("profilePicture")]
        public async Task<IActionResult> UploadProfilePicture([FromForm] IFormFile profilePicture, [FromForm] int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (profilePicture == null || profilePicture.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "profile_pictures");
            Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{userId}_{Path.GetFileName(profilePicture.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            if (!string.IsNullOrEmpty(user.ProfilePictureFileName))
            {
                var existingFilePath = Path.Combine(uploadsFolder, user.ProfilePictureFileName);
                if (System.IO.File.Exists(existingFilePath))
                {
                    using var existingFileStream = System.IO.File.OpenRead(existingFilePath);
                    using var newFileStream = profilePicture.OpenReadStream();

                    if (existingFileStream.Length == newFileStream.Length)
                    {
                        var existingFileHash = ComputeHash(existingFileStream);
                        var newFileHash = ComputeHash(newFileStream);

                        if (existingFileHash.SequenceEqual(newFileHash))
                        {
                            return BadRequest("The uploaded file is the same as the existing one.");
                        }
                    }
                }
            }

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await profilePicture.CopyToAsync(fileStream);
            }

            if (!string.IsNullOrEmpty(user.ProfilePictureFileName))
            {
                var oldFilePath = Path.Combine(uploadsFolder, user.ProfilePictureFileName);
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
            }

            user.ProfilePictureFileName = fileName;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("profilePicture")]
        public async Task<IActionResult> UpdateProfilePicture([FromForm] IFormFile profilePicture, [FromForm] int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (profilePicture == null || profilePicture.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "profile_pictures");
            Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{userId}_{Path.GetFileName(profilePicture.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await profilePicture.CopyToAsync(fileStream);
            }

            if (!string.IsNullOrEmpty(user.ProfilePictureFileName))
            {
                var oldFilePath = Path.Combine(uploadsFolder, user.ProfilePictureFileName);
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
            }

            user.ProfilePictureFileName = fileName;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("profilePicture")]
        public async Task<IActionResult> DeleteProfilePicture([FromQuery] int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (string.IsNullOrEmpty(user.ProfilePictureFileName))
            {
                return BadRequest("No profile picture to delete.");
            }

            var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "profile_pictures");
            var filePath = Path.Combine(uploadsFolder, user.ProfilePictureFileName);

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            user.ProfilePictureFileName = string.Empty;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string enteredPassword, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(enteredPassword, storedHash);
        }

        private byte[] ComputeHash(Stream stream)
        {
            using var md5 = System.Security.Cryptography.MD5.Create();
            return md5.ComputeHash(stream);
        }
    }
}
