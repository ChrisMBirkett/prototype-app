using System.Collections.Generic;

namespace prototype_app.Models.Sslam
{
    public class SslamSearchListModel
    {
        public IEnumerable<CourtSearchListModel> Courts { get; set; }
        public IEnumerable<FileTypeSearchListModel> FileTypes { get; set; }
        public IEnumerable<CourtTypeSearchListModel> CourtTypes { get; set; }
        public IEnumerable<SupplierSearchListModel> Suppliers { get; set; }
    }
}
