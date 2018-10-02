CREATE PROCEDURE [dbo].[usp_GetStateListBySowMetricId_sel]
	@sowMetricID int
AS
BEGIN

	SET NOCOUNT ON;
	SET FMTONLY OFF; -- added this to ensure that EntityFramework can see the columns that this sproc returns

	SELECT StateOfService
	FROM States
	ORDER BY StateOfService

END