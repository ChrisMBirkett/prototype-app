CREATE TABLE SslamTestSearchResults (
		SearchResultsId INT NOT NULL IDENTITY(1,1) PRIMARY KEY
		,SOWMetricID INT NOT NULL
		,SOWMetricDescription NVARCHAR(50) NOT NULL
		,VendorID INT NOT NULL
		,BusinessName NVARCHAR(50) NOT NULL
		,ContractID INT NOT NULL
		,TableID INT NOT NULL
		,Goal FLOAT NOT NULL
		,Threshold FLOAT NOT NULL
		,StartDate DATETIME NOT NULL
		,EndDate DATETIME NULL
		,MasterID CHAR(10) NOT NULL
		,FileTypeID VARCHAR(6) NOT NULL
		,[Service] VARCHAR(100) NOT NULL
		,StateOfService CHAR(2) NULL
		,CourtType CHAR(1) NOT NULL
	)

GO

CREATE TABLE [dbo].[SOWMetrics](
	[SOWMetricID] [int] NOT NULL,
	[SOWMetricDescription] [nvarchar](50) NOT NULL,
	[SOWMetricChangeReasonID] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[UpdatedBy] [nvarchar](50) NOT NULL,
	[LastUpdated] [datetime] NOT NULL,
	[CreatedBy] [nvarchar](50) NOT NULL,
	[DateCreated] [datetime] NOT NULL,
 CONSTRAINT [PK_SOWMetricID] PRIMARY KEY CLUSTERED 
(
	[SOWMetricID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[SOWMetrics] ADD  CONSTRAINT [DF__SOWMetric__SOWMe__54F8DF9D]  DEFAULT ((1)) FOR [SOWMetricChangeReasonID]
GO

ALTER TABLE [dbo].[SOWMetrics] ADD  CONSTRAINT [DF_SOWMetrics_LastUpdated]  DEFAULT (getdate()) FOR [LastUpdated]
GO

ALTER TABLE [dbo].[SOWMetrics] ADD  CONSTRAINT [DF_SOWMetrics_DateCreated]  DEFAULT (getdate()) FOR [DateCreated]
GO