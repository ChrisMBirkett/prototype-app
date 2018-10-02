/*
Author: Chris Birkett
Date: 7/11/2018
Modified Date:
Modified by:

Description:

This sproc returns information for a given SOWMetric and presents the results in a user-friendly format. This depends on
the view vsSlaMetricDetails and will return multiple resultsets that represent the available filter lists based on the 
total records available for the given search. This sproc also manages paging and sorting.

Parameters:

@sowMetricID int					- this parameter is required; it is the metric that the SSLAM user is going to work with
,@state nvarchar(2)					- optional: StateOfService
,@masterID nvarchar(10)				- optional: Court
,@fileTypeID nvarchar(10)			- optional: FileType
,@courtType	nvarchar(1)				- optional: CourtType
,@vendorID int						- optional: Supplier
,@sortBy NVARCHAR(50) = ''			- optional: name of the column to sort by; defaults to TableID if blank
,@sortDirection NVARCHAR(4) = 'ASC' - optional: indicates the sort direction; defaults to ASC if blank
,@page INT = 1						- required: defaulted to 1 to ease testing
,@pageSize INT = 100				- required: default to 100 to ease testing
,@totalResults INT OUTPUT			- this returns the total number that the search returns and is intended to be displayed 
										in the grid to inform the user of the total results found

Notes:

Sortable/Filterable grid columns:

Supplier ID = Vendor ID
Contract ID = ContractID
Supplier Business Name = BusinessName
Court = MasterID
FileType = FileTypeID
Service = Service
Goal = Goal
Threshold = Threshold
Start Date = StartDate
End Date = EndDate

TEST:

-- test SLARecordVolume for state of TN
DECLARE @totalResults INT
EXEC [dbo].[usp_GetSlaGoalsSearch_sel] 5, 'TN', '', '', '', 0, '', '', 1, 100, @totalResults OUT
SELECT @totalResults AS "TotalResults"




*/

CREATE PROCEDURE dbo.usp_GetSlaGoalsSearchTestData_sel
(
	@sowMetricID INT
	,@state NVARCHAR(2)
	,@masterID NVARCHAR(10)
	,@fileTypeID NVARCHAR(10)
	,@courtType NVARCHAR(1)
	,@vendorID INT
	,@vendorIdFilter NVARCHAR(MAX) = ''
	,@contractIdFilter NVARCHAR(MAX) = ''
	,@supplierNameFilter NVARCHAR(MAX) = ''
	,@courtFilter NVARCHAR(MAX) = ''
	,@fileTypeFilter NVARCHAR(MAX) = ''
	,@serviceFilter NVARCHAR(MAX) = ''
	,@goalFilter NVARCHAR(MAX) = ''
    ,@thresholdFilter NVARCHAR(MAX) = ''
	,@startDateFilter NVARCHAR(MAX) = ''
	,@endDateFilter NVARCHAR(MAX) = ''
	,@sortBy NVARCHAR(50) = ''
	,@sortDirection NVARCHAR(4) = 'ASC'
	,@page INT = 1
	,@pageSize INT = 100
	,@totalResults INT OUTPUT
)
AS
BEGIN

	SET FMTONLY OFF; -- added this to ensure that EntityFramework can see the columns that this sproc returns
	SET NOCOUNT ON;

	IF ISNULL(@sortDirection, '') = '' BEGIN
		SET @sortDirection = 'ASC'
	END
	IF ISNULL(@sortBy, '') = '' BEGIN
		SET @sortBy = 'TableID'
	END
	
	-- Return the total number of results
	SELECT @totalResults = COUNT(TableID) FROM SslamTestSearchResults

	-- Return the search results
	;WITH Metrics_CTE -- the semicolon is here because the previous statement has to be terminated, otherwise it emits an error: Msg 319, Level 15, State 1
		(
			RowNumber
			,SOWMetricID
			,SOWMetricDescription
			,VendorID
			,BusinessName
			,ContractID
			,TableID
			,Goal
			,Threshold
			,StartDate
			,EndDate
			,MasterID
			,FileTypeID
			,"Service"
		)
	AS
	(
		SELECT	ROW_NUMBER() OVER(ORDER BY 
				CASE WHEN @sortBy = 'TableID' AND @sortDirection = 'ASC' THEN TableID END,
				CASE WHEN @sortBy = 'TableID' AND @sortDirection = 'DESC' THEN TableID END DESC,
				CASE WHEN @sortBy = 'VendorID' AND @sortDirection = 'ASC' THEN VendorID END,
				CASE WHEN @sortBy = 'VendorID' AND @sortDirection = 'DESC' THEN VendorID END DESC,
				CASE WHEN @sortBy = 'ContractID' AND @sortDirection = 'ASC' THEN ContractID END,
				CASE WHEN @sortBy = 'ContractID' AND @sortDirection = 'DESC' THEN ContractID END DESC,
				CASE WHEN @sortBy = 'BusinessName' AND @sortDirection = 'ASC' THEN BusinessName END,
				CASE WHEN @sortBy = 'BusinessName' AND @sortDirection = 'DESC' THEN BusinessName END DESC,
				CASE WHEN @sortBy = 'MasterID' AND @sortDirection = 'ASC' THEN MasterID END,
				CASE WHEN @sortBy = 'MasterID' AND @sortDirection = 'DESC' THEN MasterID END DESC,
				CASE WHEN @sortBy = 'FileTypeID' AND @sortDirection = 'ASC' THEN FileTypeID END,
				CASE WHEN @sortBy = 'FileTypeID' AND @sortDirection = 'DESC' THEN FileTypeID END DESC,
				CASE WHEN @sortBy = 'Goal' AND @sortDirection = 'ASC' THEN Goal END,
				CASE WHEN @sortBy = 'Goal' AND @sortDirection = 'DESC' THEN Goal END DESC,
				CASE WHEN @sortBy = 'Threshold' AND @sortDirection = 'ASC' THEN Threshold END,
				CASE WHEN @sortBy = 'Threshold' AND @sortDirection = 'DESC' THEN Threshold END DESC,
				CASE WHEN @sortBy = 'StartDate' AND @sortDirection = 'ASC' THEN StartDate END,
				CASE WHEN @sortBy = 'StartDate' AND @sortDirection = 'DESC' THEN StartDate END DESC,
				CASE WHEN @sortBy = 'EndDate' AND @sortDirection = 'ASC' THEN EndDate END,
				CASE WHEN @sortBy = 'EndDate' AND @sortDirection = 'DESC' THEN EndDate END DESC,
				CASE WHEN @sortBy = 'Service' AND @sortDirection = 'ASC' THEN [Service] END,
				CASE WHEN @sortBy = 'Service' AND @sortDirection = 'DESC' THEN [Service] END DESC
			) RowNumber
			,SOWMetricID
			,SOWMetricDescription
			,VendorID
			,BusinessName
			,ContractID
			,TableID
			,Goal
			,Threshold
			,StartDate
			,EndDate
			,MasterID
			,FileTypeID
			,[Service]
		FROM SslamTestSearchResults
		WHERE SOWMetricID = @sowMetricID -- this criteria is required for a successful search
			AND (@vendorID = 0 OR VendorID = @vendorID)
			AND (@state = '' OR StateOfService = @state) 
			AND (@masterID = '' OR MasterID = @masterID) 
			AND (@fileTypeID = '' OR FileTypeID = @fileTypeID) 
			AND (@courtType = '' OR CourtType = @courtType)
			AND (@fileTypeFilter = '' OR @fileTypeFilter LIKE '%;' + FileTypeID + ';%')
			AND (@courtFilter = '' OR @courtFilter LIKE '%;' + MasterID + ';%') -- TODO: check if this field needs to be trimmed for this filter to work
			AND (@serviceFilter = '' OR @serviceFilter LIKE '%;' + [Service] + ';%')
			AND (@supplierNameFilter = '' OR @supplierNameFilter LIKE '%;' + BusinessName + ';%')
	)
	SELECT TableID
		,SOWMetricID
		,SOWMetricDescription
		,VendorID
		,BusinessName
		,ContractID
		,Goal
		,Threshold
		,CONVERT(VARCHAR(10), StartDate, 101) AS "StartDate"
		,CONVERT(VARCHAR(10), EndDate, 101) AS EndDate
		,MasterID
		,FileTypeID
		,[Service]
	FROM Metrics_CTE
	WHERE RowNumber BETWEEN ((@Page - 1) * @PageSize + 1) AND (@Page * @PageSize) -- paging logic

	-- Begin returning the filter result lists for the filterable grid columns

	-- Suppliers
	SELECT DISTINCT CAST(VendorID AS NVARCHAR) VendorID
	FROM SslamTestSearchResults
	ORDER BY VendorID

	-- Contracts
	SELECT DISTINCT CAST(ContractID AS NVARCHAR) ContractID
	FROM SslamTestSearchResults
	ORDER BY ContractID

	-- Business names
	SELECT DISTINCT BusinessName
	FROM SslamTestSearchResults
	ORDER BY BusinessName

	-- Courts
	SELECT DISTINCT MasterID
	FROM SslamTestSearchResults
	ORDER BY MasterID

	-- File types
	SELECT DISTINCT SslamTestSearchResults.FileTypeID
	FROM SslamTestSearchResults
	ORDER BY SslamTestSearchResults.FileTypeID

	-- Service
	SELECT DISTINCT [Service]
	FROM SslamTestSearchResults
	ORDER BY [Service]

	-- Goal
	SELECT DISTINCT CAST(Goal AS NVARCHAR) Goal
	FROM SslamTestSearchResults
	ORDER BY Goal

	-- Threshold
	SELECT DISTINCT CAST(Threshold AS NVARCHAR) Threshold
	FROM SslamTestSearchResults
	ORDER BY Threshold

	-- Start date
	SELECT DISTINCT CONVERT(NVARCHAR(10), StartDate, 101) StartDate
	FROM SslamTestSearchResults
	ORDER BY StartDate

	-- End date
	SELECT DISTINCT CONVERT(NVARCHAR(10), EndDate, 101) EndDate
	FROM SslamTestSearchResults
	ORDER BY EndDate

END

GO

--GRANT EXECUTE ON usp_GetSlaGoalsSearch_sel TO VSLAM