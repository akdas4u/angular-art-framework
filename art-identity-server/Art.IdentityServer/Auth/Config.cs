namespace Art.IdentityServer.Auth
{
    using IdentityModel;
    using IdentityServer4;
    using IdentityServer4.Models;
    using IdentityServer4.Test;
    using Microsoft.Extensions.Configuration;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;

    public class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
           {
               new IdentityResources.OpenId(),
               new IdentityResources.Profile(),
           };
        }

        public static IEnumerable<ApiResource> GetApiResources(IConfiguration configuration)
        {
            var resources = new List<ApiResource>
            {
                new ApiResource(configuration["Endpoints:Development:ClientId"], configuration["Endpoints:Development:ClientName"])
                // Adicione aqui outros API Resources como QAS ou Produção
                // new ApiResource(configuration["Endpoints:Quality:ClientId"], configuration["Endpoints:Quality:ClientName"])
                // new ApiResource(configuration["Endpoints:Prodution:ClientId"], configuration["Endpoints:Prodution:ClientName"])
            };

            return resources;
        }

        public static IEnumerable<Client> GetClients(IConfiguration configuration)
        {
            var clients = new List<Client>
            {
                // Adicione aqui outros Clients
                new Client {
                    ClientId = configuration["Endpoints:Development:ClientId"],
                    ClientName = configuration["Endpoints:Development:ClientName"],
                    AccessTokenLifetime = int.Parse(configuration["Endpoints:Development:AccessTokenLifetime"]),
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    ClientSecrets =
                    {
                        new Secret(configuration["Endpoints:Development:Secret"].Sha256())
                    },
                    AllowedCorsOrigins = configuration["Endpoints:Development:AllowedCorsOrigins"].Split(" ").ToList(),
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        configuration["Endpoints:Development:ClientId"]
                    },
                    AlwaysIncludeUserClaimsInIdToken = true
                }
            };

            return clients;
        }

        public static List<TestUser> GetUsers()
        {
            // A ideia é dos usuários serem retornados por um repositorio que faz acesso a um banco de dados
            // Os usuários em memória é apenas para efeitos de testes
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "creapr",
                    Password = "abc951@#",
                    Claims = new List<Claim>
                    {
                        new Claim(JwtClaimTypes.GivenName, "CREA-PR"),
                        new Claim(JwtClaimTypes.Email, "creapr@creapr.com.br"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean)
                    }
                },
                new TestUser
                {
                    SubjectId = "2",
                    Username = "blendit",
                    Password = "aaa999!+",
                    Claims = new List<Claim>
                    {
                        new Claim(JwtClaimTypes.GivenName, "BlendIT"),
                        new Claim(JwtClaimTypes.Email, "vinicius.silva@blendit.com.br"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean)
                    }
                }
            };
        }
    }
}
