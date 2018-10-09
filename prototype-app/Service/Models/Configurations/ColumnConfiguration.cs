using System.ComponentModel.DataAnnotations;

namespace OKC.DLL.VendorManagement.Service.Models.Configurations
{
    public class ColumnConfiguration
    {
        [Required]
        public string ColumnHeader { get; set; }
        [Required]
        public string ColumnBinding { get; set; }

        [Required]
        public int Width { get; set; }
        [Required]
        public string Format { get; set; }
    }
}
