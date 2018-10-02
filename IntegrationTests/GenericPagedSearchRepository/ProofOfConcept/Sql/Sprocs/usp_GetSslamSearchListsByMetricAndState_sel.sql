CREATE PROC usp_GetSslamSearchListsByMetricAndState_sel
	@sowMetricID INT,
	@state CHAR(2)
AS
BEGIN

	SET NOCOUNT ON;
	SET FMTONLY OFF; -- added this to ensure that EntityFramework can see the columns that this sproc returns

	SELECT ListType, Value, Description
	FROM ListByType
	ORDER BY ListType

END