using prototype_app.Domain.Abstract;
using prototype_app.Models.Sslam;

namespace prototype_app.Domain.Sslam.Query
{
    public class GetSearchListsByMetricAndStateQuery : IQuery<SslamSearchListModel>
    {
        public int SowMetricId { get; set; }
        public string State { get; set; }
    }
}
