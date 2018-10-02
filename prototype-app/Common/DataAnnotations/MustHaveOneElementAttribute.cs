using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace prototype_app.Common.DataAnnotations
{
    /// <summary>
    /// This is a custom Data Annotations attribute intended to be used to check lists
    /// and ensure they have at least one element.
    /// </summary>
    public class MustHaveOneElementAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value is IList list)
            {
                return list.Count > 0;
            }
            return false;
        }
    }
}
