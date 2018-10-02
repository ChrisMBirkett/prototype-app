using System.Collections;

namespace prototype_app.Models.PagedSearch
{
    public class Column
    {
        public string ColumnHeader { get; set; }
        public string ColumnId { get; set; }
        public string Width { get; set; }
        public string Format { get; set; }
        public IEnumerable FilterValues { get; set; }

        public Column(string columnHeader, string columnId, IEnumerable filterValues)
        {
            ColumnHeader = columnHeader;
            ColumnId = columnId;
            FilterValues = filterValues;
        }

        public Column()
        {
            // needed for serilization
        }
    }
}
