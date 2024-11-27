import React, { useState } from "react";

const Step3: React.FC<{ formData: any; setFormData: any }> = ({ formData, setFormData }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

   
    setErrorMessage(""); 
    setFormData({ ...formData, file }); 
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 3: Upload File</h2>

      <input
        type="file"
        accept=".png, .pdf"
        onChange={handleFileChange}
        className="w-full p-2 border rounded mb-4"
      />

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      
      <div>
        <p>Selected File: {formData.file ? formData.file.name : "No file selected"}</p>
      </div>
    </div>
  );
};

export default Step3;
