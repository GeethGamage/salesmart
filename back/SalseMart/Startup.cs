using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SalseMart.Startup))]
namespace SalseMart
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
