﻿using System.ComponentModel.DataAnnotations;

namespace TaskListAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public string? ProfilePictureFileName { get; set; }
    }
}