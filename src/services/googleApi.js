import { google } from 'googleapis';

export async function getVideoMetadata(spreadsheetId) {
  const sheets = google.sheets({ version: 'v4' });
  
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:C', // Adjust based on your spreadsheet structure
    });

    return response.data.values.map(row => ({
      videoId: row[0],
      title: row[1],
      description: row[2]
    }));
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return [];
  }
}