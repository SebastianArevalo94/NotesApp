using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using ToDoListApp.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using NotesApp.Models;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly NotesAppContext _context;
    private readonly JwtSettings _jwtSettings;

    public AuthController(NotesAppContext context, IOptions<JwtSettings> jwtSettings)
    {
        _context = context;
        _jwtSettings = jwtSettings.Value;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel user)
    {
        if (user is null)
        {
            return BadRequest(new { message = "Invalid client request" });
        }

        var userDB = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

        if (userDB == null)
        {
            return BadRequest(new { message = "Usuario Inexistente"});
        }

        if (user.Password != userDB.Password)
        {
            return BadRequest(new { message = "Contraseña incorrecta" });
        }

        // Crear las claims incluyendo el userId
        var claims = new List<Claim>
    {
        //new Claim(JwtRegisteredClaimNames.Sub, userDB.Email),
        new Claim("userId", userDB.Id.ToString())  // Asumiendo que userDB.Id es el userId
    };

        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
        var tokenOptions = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(_jwtSettings.TokenExpiryInMinutes),
            signingCredentials: signinCredentials
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

        return Ok(new AuthenticatedResponse { Token = tokenString });
    }
}