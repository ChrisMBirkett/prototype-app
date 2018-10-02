namespace prototype_app.Common
{
    public static class TransactionHelper
    {
        public static TransactionScope GetTransactionScopeRequiresNew()
        {
            return new TransactionScope(
                TransactionScopeOption.RequiresNew,
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.ReadCommitted,
                    Timeout = new System.TimeSpan(0, 1, 0)
                });
        }
    }
}
