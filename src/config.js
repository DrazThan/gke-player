const config = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    spreadsheetId: process.env.REACT_APP_SPREADSHEET_ID,
    // Use CDN URL instead of direct storage URL
    cdnBasePath: process.env.REACT_APP_CDN_URL,
  };
  
  export default config;