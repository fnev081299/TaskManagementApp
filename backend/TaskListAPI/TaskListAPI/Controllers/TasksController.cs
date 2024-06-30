using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskListAPI.Models;
using TaskListAPI.Services;

namespace TaskListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Task>>> GetTasks()
        {
            var tasks = await _taskService.GetAllTasks();
            return Ok(tasks);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Models.Task>>> GetTasksByUserId(int userId)
        {
            var tasks = await _taskService.GetTasksByUserId(userId);

            if (tasks == null || !tasks.Any())
            {
                return Ok(new List<Models.Task>());
            }

            return Ok(tasks);
        }

        [HttpGet("{id}/user/{userId}")]
        public async Task<ActionResult<Models.Task>> GetTask(int userId, int id)
        {
            var task = await _taskService.GetTaskById(userId, id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPut("{id}/user/{userId}")]
        public async Task<IActionResult> PutTask(int userId, int id, Models.Task task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            var result = await _taskService.UpdateTask(userId, task);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost("user/{userId}")]
        public async Task<ActionResult<Models.Task>> PostTask(int userId, Models.Task task)
        {
            var createdTask = await _taskService.CreateTask(userId, task);
            return CreatedAtAction(nameof(GetTask), new { userId = createdTask.UserId, id = createdTask.Id }, createdTask);
        }

        [HttpDelete("{id}/user/{userId}")]
        public async Task<IActionResult> DeleteTask(int userId, int id)
        {
            var result = await _taskService.DeleteTask(userId, id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
