import React, { useState, useEffect } from "react";

const Step4: React.FC<{ formData: any; setFormData: any }> = ({ formData, setFormData }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [geolocation, setGeolocation] = useState<{ lat: number; lon: number } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    
    if (files.length + (formData.files?.length || 0) > 5) {
      setErrorMessage("You can upload a maximum of 5 files.");
      return;
    }

    const validFileTypes = ["image/png", "application/pdf"];
    const maxFileSize = 2 * 1024 * 1024; 
    const invalidFiles = files.filter(file => !validFileTypes.includes(file.type) || file.size > maxFileSize);

    if (invalidFiles.length > 0) {
      setErrorMessage("Only PNG and PDF files are allowed");
      return;
    }
    
    const newFiles = [...(formData.files || []), ...files];
    setFormData({ ...formData, files: newFiles });

    setErrorMessage("");
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          setErrorMessage("Unable to retrieve geolocation.");
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 4: Upload Multiple Files & Geolocation</h2>

      <div>
        <label htmlFor="files" className="block text-sm font-medium text-gray-700">
          Upload Files (PNG, PDF - Max 5 Files)
        </label>
        <input
          type="file"
          id="files"
          accept=".png, .pdf"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-4"
        />
        
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        
        {formData.files && formData.files.length > 0 && (
          <div className="mt-2">
            <h3 className="text-sm font-medium text-gray-700">Uploaded Files:</h3>
            <ul className="list-disc pl-5 text-sm">
              {formData.files.map((file: File, index: number) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700">Geolocation:</h3>
        {geolocation ? (
          <p className="text-sm text-gray-600">
            Latitude: {geolocation.lat}, Longitude: {geolocation.lon}
          </p>
        ) : (
          <p className="text-sm text-gray-600">Fetching geolocation...</p>
        )}
      </div>
    </div>
  );
};

export default Step4;
