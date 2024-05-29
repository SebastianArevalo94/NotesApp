using Microsoft.EntityFrameworkCore;
using NotesApp.Models;

namespace ToDoListApp.Models
{
    public class NotesAppContext(DbContextOptions<NotesAppContext> options) : DbContext(options)
    {
        public DbSet<Note> Notes { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
    }
}