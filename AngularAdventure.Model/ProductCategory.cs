using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularAdventure.Model
{
    [Table("SalesLT.ProductCategory")]
    public partial class ProductCategory
    {
        public ProductCategory()
        {
            Product = new HashSet<Product>();
            ProductCategory1 = new HashSet<ProductCategory>();
        }

        public int ProductCategoryId { get; set; }

        public int? ParentProductCategoryId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public DateTime ModifiedDate { get; set; }

        public virtual ICollection<Product> Product { get; set; }

        public virtual ICollection<ProductCategory> ProductCategory1 { get; set; }

        public virtual ProductCategory ProductCategory2 { get; set; }
    }
}
