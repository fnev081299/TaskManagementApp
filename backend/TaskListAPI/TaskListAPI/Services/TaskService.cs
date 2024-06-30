using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Task = TaskListAPI.Models.Task;
using TaskListAPI.Data;

namespace TaskListAPI.Services
{
    public class TaskService : ITaskService
    {
        private readonly TaskContext _context;

        public TaskService(TaskContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Task>> GetTasksByUserId(int userId)
        {
            return await _context.Tasks.Where(task => task.UserId == userId).ToListAsync() ?? new List<Task>();
        }

        public async Task<Task?> GetTaskById(int userId, int taskId)
        {
            return await _context.Tasks.FirstOrDefaultAsync(task => task.UserId == userId && task.Id == taskId);
        }

        public async Task<Task> CreateTask(int userId, Task task)
        {
            task.UserId = userId;
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<bool> UpdateTask(int userId, Task task)
        {
            var existingTask = await _context.Tasks.FirstOrDefaultAsync(t => t.UserId == userId && t.Id == task.Id);
            if (existingTask == null)
            {
                return false;
            }

            existingTask.Title = task.Title;
            existingTask.Description = task.Description;
            existingTask.Status = task.Status;
            _context.Entry(existingTask).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteTask(int userId, int taskId)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.UserId == userId && t.Id == taskId);
            if (task == null)
            {
                return false;
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Task>> GetAllTasks()
        {
            return await _context.Tasks.ToListAsync() ?? new List<Task>();
        }
    }
}
