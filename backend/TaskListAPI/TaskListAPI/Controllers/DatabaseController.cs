using Microsoft.AspNetCore.Mvc;
using TaskListAPI.Services;

namespace TaskListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatabaseController : ControllerBase
    {
        private readonly DatabaseInitializer _databaseInitializer;

        public DatabaseController(DatabaseInitializer databaseInitializer)
        {
            _databaseInitializer = databaseInitializer;
        }

        [HttpPost("reset")]
        public IActionResult ResetDatabase()
        {
            _databaseInitializer.ResetDatabase();
            return Ok("Database has been reset and seeded with initial data.");
        }
    }
}
