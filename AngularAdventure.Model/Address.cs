using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularAdventure.Model
{
    [Table("SalesLT.Address")]
    public partial class Address
    {
        public Address()
        {
            CustomerAddress = new HashSet<CustomerAddress>();
            SalesOrderHeader = new HashSet<SalesOrderHeader>();
            SalesOrderHeader1 = new HashSet<SalesOrderHeader>();
        }

        public int AddressID { get; set; }

        [Required]
        [StringLength(60)]
        public string AddressLine1 { get; set; }

        [StringLength(60)]
        public string AddressLine2 { get; set; }

        [Required]
        [StringLength(30)]
        public string City { get; set; }

        [Required]
        [StringLength(50)]
        public string StateProvince { get; set; }

        [Required]
        [StringLength(50)]
        public string CountryRegion { get; set; }

        [Required]
        [StringLength(15)]
        public string PostalCode { get; set; }

        public Guid rowguid { get; set; }

        public DateTime ModifiedDate { get; set; }

        public virtual ICollection<CustomerAddress> CustomerAddress { get; set; }

        public virtual ICollection<SalesOrderHeader> SalesOrderHeader { get; set; }

        public virtual ICollection<SalesOrderHeader> SalesOrderHeader1 { get; set; }
    }
}
