using System.Collections.Generic;
using prototype_app.Domain.Abstract;
using prototype_app.Models.Sslam;

namespace prototype_app.Domain.Sslam.Query
{
    public class GetStateSearchListBySowMetricQuery : IQuery<IEnumerable<StateSearchListModel>>
    {
        public int SowMetricId { get; set; }
    }
}
