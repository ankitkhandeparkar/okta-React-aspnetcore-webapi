using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace okta_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        [Authorize]
        [HttpGet]
        [Route("~/api/messages")]
        [EnableCors("AllowAll")]

        public JsonResult Get()
        {
            var principal = HttpContext.User.Identity as ClaimsIdentity;

            var login = principal.Claims
                .SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                ?.Value;

            return new JsonResult(new
            {
                messages = new dynamic[]
                {
                    new { Date = DateTime.Now, Text = "Sending this Message from Server" },
                    new { Date = DateTime.Now, Text = "Verified the access Token" },
                    new { Date = DateTime.Now, Text = "You are now Authenicated by okta" },
                    new { Date = DateTime.Now, Text = "I hope this was helpful" },
                },
            });
        }
    }
}