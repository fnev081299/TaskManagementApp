using Microsoft.AspNetCore.Mvc;

namespace TaskListAPI.Controllers
{
    [Route("api/status")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetStatus()
        {
            return Ok(new { status = "Backend is running" });
        }
    }
}
