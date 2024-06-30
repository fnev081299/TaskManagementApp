using System.Collections.Generic;
using System.Threading.Tasks;
using Task = TaskListAPI.Models.Task;

namespace TaskListAPI.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<Task>> GetTasksByUserId(int userId);
        Task<Task?> GetTaskById(int userId, int taskId);
        Task<Task> CreateTask(int userId, Task task);
        Task<bool> UpdateTask(int userId, Task task);
        Task<bool> DeleteTask(int userId, int taskId);
        Task<IEnumerable<Task>> GetAllTasks();
    }
}
