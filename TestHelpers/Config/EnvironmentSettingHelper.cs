namespace TestHelpers.Config
{
    public static class EnvironmentSettingHelper
    {
        public static void SetEnvironmentAppSetting(string newValue, bool setNewValue)
        {
            var config = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
            config.AppSettings.Settings.Remove("environment");
            if (setNewValue)
                config.AppSettings.Settings.Add("environment", newValue);
            config.Save(ConfigurationSaveMode.Modified);
            ConfigurationManager.RefreshSection("appSettings");
        }

        public static void ResetEnvironmentAppSetting()
        {
            var config = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
            config.AppSettings.Settings.Remove("environment");
            config.AppSettings.Settings.Add("environment", "test");
            config.Save(ConfigurationSaveMode.Modified);
            ConfigurationManager.RefreshSection("appSettings");
        }
    }
}
