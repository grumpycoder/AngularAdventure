using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularAdventure.Model
{
    [Table("SalesLT.SalesOrderDetail")]
    public partial class SalesOrderDetail
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int SalesOrderId { get; set; }

        [Key]
        [Column(Order = 1)]
        public int SalesOrderDetailId { get; set; }

        public short OrderQty { get; set; }

        public int ProductId { get; set; }

        [Column(TypeName = "money")]
        public decimal UnitPrice { get; set; }

        [Column(TypeName = "money")]
        public decimal UnitPriceDiscount { get; set; }

        [Column(TypeName = "numeric")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public decimal LineTotal { get; set; }

        public DateTime ModifiedDate { get; set; }

        public virtual Product Product { get; set; }

        public virtual SalesOrderHeader SalesOrderHeader { get; set; }
    }
}
