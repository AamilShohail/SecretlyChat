using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class ApplicationSettings
    {
        public string JWT_Secret { get; set; }
        public string Client_URL { get; set; }
        public string APPKEYBASE64 { get; set; }
        public string APP_ID { get; set; }
        public string APP_KEY_ID { get; set; }
        public string APP_KEY_PASSWORD { get; set; }
    }
}
