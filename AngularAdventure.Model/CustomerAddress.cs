using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularAdventure.Model
{
    [Table("SalesLT.CustomerAddress")]
    public partial class CustomerAddress
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CustomerId { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int AddressId { get; set; }

        [Required]
        [StringLength(50)]
        public string AddressType { get; set; }

        public DateTime ModifiedDate { get; set; }

        public virtual Address Address { get; set; }

        public virtual Customer Customer { get; set; }
    }
}
