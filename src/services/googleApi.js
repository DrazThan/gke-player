export async function getVideoMetadata(spreadsheetId, apiKey) {
    const sheetsApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:C?key=${apiKey}`;
    
    try {
      const response = await fetch(sheetsApiUrl);
      const data = await response.json();
      
      if (!data.values) {
        console.error('No data found in spreadsheet');
        return [];
      }
  
      // Skip header row and map the data
      return data.values.slice(1).map(row => ({
        videoId: row[0],
        title: row[1],
        description: row[2]
      }));
    } catch (error) {
      console.error('Error fetching metadata:', error);
      return [];
    }
  }
  