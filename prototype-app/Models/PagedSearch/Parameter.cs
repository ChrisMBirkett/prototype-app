using System.Data;

namespace prototype_app.Models.PagedSearch
{
    public class Parameter
    {
        public string Name { get; set; }
        public object Value { get; set; }
        public DbType DbDataType { get; set; }
        public bool IsNullable { get; set; }

        public Parameter()
        {
            
        }

        public Parameter(string name, object value, DbType dbDataType, bool isNullable)
        {
            Name = name;
            DbDataType = dbDataType;
            IsNullable = isNullable;

            if (DbDataType == DbType.String)
            {
                Value = value ?? "";
            }
            else
            {
                Value = value;
            }
        }
    }
}
