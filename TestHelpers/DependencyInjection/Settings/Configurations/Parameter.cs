namespace TestHelpers.DependencyInjection.Settings.Configurations
{
    public class Parameter
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public DbType DbDataType { get; set; }
        [Required]
        public bool IsNullable { get; set; }
    }
}
