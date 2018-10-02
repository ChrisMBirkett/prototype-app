namespace TestHelpers.DependencyInjection.Settings.Configurations
{
    public class ColumnConfiguration
    {
        [Required]
        public string ColumnHeader { get; set; }
        [Required]
        public string ColumnBinding { get; set; }
        [Required]
        public string ResultSetType { get; set; }
    }
}
