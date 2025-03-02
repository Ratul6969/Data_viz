import { useState } from 'react';
import { RiUploadCloud2Line } from 'react-icons/ri';

export default function CSVPanel() {
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
    } else {
      alert("Please select a valid CSV file");
      setSelectedFile(null);
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Data Upload</h2>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
            <RiUploadCloud2Line className="mx-auto text-gray-400 text-4xl mb-2" />
            <p className="mb-2 text-sm font-semibold">Upload your CSV file</p>
            <p className="text-xs text-gray-500 mb-4">Drag & drop or click to browse</p>
            
            <input 
              type="file" 
              accept=".csv" 
              className="hidden" 
              id="csv-upload"
              onChange={handleFileChange}
            />
            <label 
              htmlFor="csv-upload" 
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors"
            >
              Select File
            </label>
          </div>
          
          {selectedFile && (
            <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="text-sm font-medium">Selected file:</p>
              <p className="text-xs truncate">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
          
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              <span className="font-semibold">Note:</span> Max file size: 100MB
            </p>
            <p className="text-xs text-gray-500">
              CSV files only. Make sure your data has headers.
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <button 
          className={`w-full py-2 rounded ${
            selectedFile 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-gray-300 cursor-not-allowed'
          } text-white transition-colors`}
          disabled={!selectedFile}
        >
          Process Data
        </button>
      </div>
    </div>
  );
}