using AngularAdventure.DataAccess;
using AngularAdventure.Model;
using Breeze.ContextProvider;
using Breeze.WebApi2;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Web.Http;

namespace MediaCatalog.Web.Controllers
{
    [BreezeController]
    public class BreezeController : ApiController
    {

        public BreezeController()
        {

        }

        // Todo: inject via an interface rather than "new" the concrete class
        readonly AdventureWorksRepository repository = new AdventureWorksRepository();

        [HttpGet]
        public string Metadata()
        {
            return repository.Metadata;
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return repository.SaveChanges(saveBundle);
        }

        [HttpGet]
        public IQueryable<Customer> Customers()
        {
            return repository.Customers;
        }

        [HttpGet]
        public IQueryable<Product> Products()
        {
            return repository.Products;
        }

        [HttpGet]
        public IQueryable<SalesOrderHeader> SalesOrder()
        {
            return repository.SalesOrder;
        }

        /// <summary>
        /// Query returing a 1-element array with a lookups object whose 
        /// properties are all Rooms, Tracks, and TimeSlots.
        /// </summary>
        /// <returns>
        /// Returns one object, not an IQueryable, 
        /// whose properties are "rooms", "tracks", "timeslots".
        /// The items arrive as arrays.
        /// </returns>
        [HttpGet]
        public object Lookups()
        {
            var categories = repository.ProductCategories;
            var models = repository.ProductModels;
            var descriptions = repository.ProductDescriptions;

            return new { categories, models, descriptions };
        }

        // Diagnostic
        [HttpGet]
        public string Ping()
        {
            return "pong";
        }
    }
}