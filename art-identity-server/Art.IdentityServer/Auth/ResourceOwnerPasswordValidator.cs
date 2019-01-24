namespace Art.IdentityServer.Auth
{
    using IdentityServer4.Models;
    using IdentityServer4.Test;
    using IdentityServer4.Validation;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly IEnumerable<TestUser> usuarioRepository = Config.GetUsers();

        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            try
            {
                // var user = _usuariosAppService.GetByLogin(context.UserName, MD5.GetMD5Hash(context.Password));
                var user = usuarioRepository.Where(u => u.Username == context.UserName && u.Password == context.Password).FirstOrDefault();
                if (user != null)
                {
                    var claim = GetUserClaims(user);
                    var identity = new ClaimsIdentity(context.Request.ClientClaims);
                    identity.AddClaims(claim);

                    context.Result = new GrantValidationResult(
                        // subject: user.Id.ToString(),
                        subject: user.SubjectId,
                        authenticationMethod: "custom",
                        claims: claim);

                    return;
                }
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Usuario ou Senha Incorretos.");
                return;
            }
            catch (Exception ex)
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Usuario ou Senha Incorretos");
            }
        }

        public static Claim[] GetUserClaims(TestUser user)
        {
            return user.Claims.ToArray();
        }
    }
}
