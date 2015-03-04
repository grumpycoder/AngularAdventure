using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularAdventure.Model
{
    [Table("SalesLT.Product")]
    public partial class Product
    {
        public Product()
        {
            SalesOrderDetail = new HashSet<SalesOrderDetail>();
        }

        //[Column("ProductId")]
        //public int Id { get; set; }


        public int ProductId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(25)]
        public string ProductNumber { get; set; }

        [StringLength(15)]
        public string Color { get; set; }

        [Column(TypeName = "money")]
        public decimal StandardCost { get; set; }

        [Column(TypeName = "money")]
        public decimal ListPrice { get; set; }

        [StringLength(5)]
        public string Size { get; set; }

        public decimal? Weight { get; set; }

        public int? ProductCategoryId { get; set; }

        public int? ProductModelId { get; set; }

        public DateTime SellStartDate { get; set; }

        public DateTime? SellEndDate { get; set; }

        public DateTime? DiscontinuedDate { get; set; }

        public byte[] ThumbNailPhoto { get; set; }

        [StringLength(50)]
        public string ThumbnailPhotoFileName { get; set; }

        public DateTime ModifiedDate { get; set; }

        public virtual ProductCategory ProductCategory { get; set; }

        public virtual ProductModel ProductModel { get; set; }

        public virtual ICollection<SalesOrderDetail> SalesOrderDetail { get; set; }
    }
}
