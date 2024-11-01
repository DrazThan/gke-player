const config = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    spreadsheetId: process.env.REACT_APP_SPREADSHEET_ID,
    cdnBasePath: `https://storage.googleapis.com/${process.env.REACT_APP_BUCKET_NAME}`
  };
  
  export default config;