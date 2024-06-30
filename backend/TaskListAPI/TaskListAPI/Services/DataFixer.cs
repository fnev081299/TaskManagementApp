using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TaskListAPI.Data;
using TaskListAPI.Models;

namespace TaskListAPI.Services
{
    public static class DataFixer
    {
        public static void CheckAndFixInvalidUserIds(IServiceProvider serviceProvider)
        {
            using (var context = new TaskContext(serviceProvider.GetRequiredService<DbContextOptions<TaskContext>>()))
            {
                var invalidTasks = context.Tasks
                    .Where(task => !context.Users.Any(user => user.Id == task.UserId))
                    .ToList();

                if (invalidTasks.Any())
                {
                    context.Tasks.RemoveRange(invalidTasks);
                    context.SaveChanges();
                    Console.WriteLine($"Fixed {invalidTasks.Count} invalid tasks.");
                }
                else
                {
                    Console.WriteLine("No invalid tasks found.");
                }
            }
        }
    }
}
