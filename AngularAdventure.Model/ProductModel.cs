using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularAdventure.Model
{
    [Table("SalesLT.ProductModel")]
    public partial class ProductModel
    {
        public ProductModel()
        {
            Product = new HashSet<Product>();
            ProductModelProductDescription = new HashSet<ProductModelProductDescription>();
        }

        public int ProductModelID { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Column(TypeName = "xml")]
        public string CatalogDescription { get; set; }

        public DateTime ModifiedDate { get; set; }

        public virtual ICollection<Product> Product { get; set; }

        public virtual ICollection<ProductModelProductDescription> ProductModelProductDescription { get; set; }
    }
}
