import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const ExcelUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

      console.log(jsonData); // Log the data to see its structure

      try {
        await axios.post('http://localhost:5000/api/uploadData', jsonData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ExcelUpload;
