using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularAdventure.Model
{
    [Table("SalesLT.ProductModelProductDescription")]
    public partial class ProductModelProductDescription
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProductModelId { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProductDescriptionId { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(6)]
        public string Culture { get; set; }

        public DateTime ModifiedDate { get; set; }

        public virtual ProductDescription ProductDescription { get; set; }

        public virtual ProductModel ProductModel { get; set; }
    }
}
