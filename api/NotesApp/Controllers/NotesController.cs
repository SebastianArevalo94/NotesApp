using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ToDoListApp.Models;
using NotesApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace NotesApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        public readonly NotesAppContext context;
        public NotesController(NotesAppContext _context)
        {
            context = _context;
        }

        [HttpGet, Authorize]
        [Route("GetNotesByUser/{userId:int}")]
        public async Task<ActionResult<Note>> GetNotesByUser(int userId)
        {
            var notes = await context.Notes.Where(note => note.UserId == userId).ToListAsync();

            return Ok(notes);
        }

        [HttpGet, Authorize]
        [Route("GetNoteById/{noteId:int}")]
        public async Task<ActionResult<Note>> GetNoteById(int noteId)
        {
            var note = await context.Notes.FindAsync(noteId);

            return Ok(note);

        }

        [HttpPost, Authorize]
        [Route("CreateNote")]
        public async Task<ActionResult<Note>> CreateNote(Note note)
        {
            context.Notes.Add(note);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(CreateNote), new { note.Id }, note);
        }

        [HttpPut, Authorize]
        [Route("UpdateNote/{NoteId}")]
        public async Task<ActionResult<Note>> UpdateNote(int NoteId, Note newNote)
        {
            if(NoteId != newNote.Id)
            {
                return BadRequest(new { message = "Note Updated!" });
            }

            context.Entry(newNote).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DBConcurrencyException)
            {

                if (!NoteExists(NoteId))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();

        }

        [HttpDelete, Authorize]
        [Route("DeleteNote/{NoteId}")]

        public async Task<ActionResult<Note>> DeleteNote(int NoteId)
        {
            var note = await context.Notes.FindAsync(NoteId);

            if(note == null)
            {
                return NotFound();
            }

            context.Notes.Remove(note);
            await context.SaveChangesAsync();
            return NoContent();
        }

        private bool NoteExists(long id)
        {
            return (context.Notes?.Any(note=> note.Id == id)).GetValueOrDefault();
        }

    }
}
