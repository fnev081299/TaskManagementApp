using Microsoft.EntityFrameworkCore;
using TaskListAPI.Data;
using TaskListAPI.Models;
using BCrypt.Net;

namespace TaskListAPI.Services
{
    public class DatabaseInitializer
    {
        private readonly TaskContext _context;

        public DatabaseInitializer(TaskContext context)
        {
            _context = context;
        }

        public void ResetDatabase()
        {
            _context.Database.EnsureDeleted();

            _context.Database.EnsureCreated();

            SeedInitialUser();
        }

        private void SeedInitialUser()
        {
            if (!_context.Users.Any())
            {
                var initialUser = new User
                {
                    Username = "test_user",
                    Email = "test@example.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("test123")
                };

                _context.Users.Add(initialUser);
                _context.SaveChanges();

                var exampleTasks = new List<Models.Task>
                {
                    new Models.Task
                    {
                        Title = "Task 1",
                        Description = "This is an in-progress task.",
                        Status = "InProgress",
                        UserId = initialUser.Id
                    },
                    new Models.Task
                    {
                        Title = "Task 2",
                        Description = "This is a pending task.",
                        Status = "Pending",
                        UserId = initialUser.Id
                    },
                    new Models.Task
                    {
                        Title = "Task 3",
                        Description = "This is a completed task.",
                        Status = "Completed",
                        UserId = initialUser.Id
                    }
                };

                _context.Tasks.AddRange(exampleTasks);
                _context.SaveChanges();
            }
        }
    }
}
