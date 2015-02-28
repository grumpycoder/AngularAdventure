using AngularAdventure.Model;
using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Newtonsoft.Json.Linq;
using System.Linq;

namespace AngularAdventure.DataAccess
{
    public class AdventureWorksRepository
    {
        private readonly EFContextProvider<AdventureWorksDbContext>
       _contextProvider = new EFContextProvider<AdventureWorksDbContext>();

        private AdventureWorksDbContext Context { get { return _contextProvider.Context; } }

        public string Metadata
        {
            get { return _contextProvider.Metadata(); }
        }
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

        public IQueryable<Customer> Customers
        {
            get { return Context.Customer; }
        }

        public IQueryable<Product> Products
        {
            get { return Context.Product; }
        }

        public IQueryable<SalesOrderHeader> SalesOrder
        {
            get { return Context.SalesOrderHeader; }
        }

        public IQueryable<ProductModel> ProductModels
        {
            get { return Context.ProductModel; }
        }

        public IQueryable<ProductDescription> ProductDescriptions
        {
            get { return Context.ProductDescription; }
        }


        public IQueryable<ProductCategory> ProductCategories
        {
            get { return Context.ProductCategory; }
        }




    }
}
