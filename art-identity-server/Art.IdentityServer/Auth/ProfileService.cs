namespace Art.IdentityServer.Auth
{
    using IdentityModel;
    using IdentityServer4.Models;
    using IdentityServer4.Services;
    using IdentityServer4.Test;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public class ProfileService : IProfileService
    {
        private readonly IEnumerable<TestUser> usuarioRepository = Config.GetUsers();

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            try
            {
                var sub = context.Subject.FindFirst("sub")?.Value;
                if (sub != null)
                {
                    var userId = int.Parse(sub);
                    // var user = _usuariosAppService.GetById(userId);
                    var user = usuarioRepository.Where(u => u.SubjectId == userId.ToString()).FirstOrDefault();
                    var claims = GetUserClaims(user);
                    if (context.RequestedClaimTypes != null && context.RequestedClaimTypes.Any())
                    {
                        claims = claims.Where(x => context.RequestedClaimTypes.Contains(x.Type)).ToList();
                    }

                    context.IssuedClaims = claims.ToList();
                }
            }
            catch (Exception ex)
            {
                // TODO: Log error
            }
        }

        // Verificando se o usuário está ativo
        public async Task IsActiveAsync(IsActiveContext context)
        {
            try
            {
                var userId = context.Subject.Claims.FirstOrDefault(x => x.Type == JwtClaimTypes.Subject);

                if (!string.IsNullOrEmpty(userId?.Value) && int.Parse(userId.Value) > 0)
                {
                    // var user = _usuariosAppService.GetById(int.Parse(userId.Value));
                    var user = usuarioRepository.Where(u => u.SubjectId == userId.Value).FirstOrDefault();
                    context.IsActive = (user != null);
                }
            }
            catch (Exception ex)
            {
                // TODO: Log error
            }
        }

        public static IEnumerable<Claim> GetUserClaims(TestUser user)
        {
            return user.Claims;
        }
    }
}
