using OKC.DLL.VendorManagement.Configuration.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OKC.DLL.VendorManagement.Service.Models.Configurations
{
    public abstract class PagedSearchSettings
    {
        [Required(ErrorMessage = "Search stored procedure is required")]
        public virtual string SearchStoredProcedure { get; set; }

        [MustHaveOneElement(ErrorMessage = "Must have at least one parameter defined")]
        public virtual List<Parameter> Parameters { get; set; }

        [Required]
        public virtual string SearchResultSetType { get; set; }

        [MustHaveOneElement(ErrorMessage = "Must have at least one column configuration defined")]
        public virtual List<ColumnConfiguration> ColumnConfigurations { get; set; }
    }
}
