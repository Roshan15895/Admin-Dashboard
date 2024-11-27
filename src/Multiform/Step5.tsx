const Step5: React.FC<{ formData: any; setFormData: any }> = ({ formData }) => {


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    const data = new FormData();
    console.log(formData);
    data.append("userName", formData.name);
    data.append("email", formData.email);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("Adl1", formData.addressLine1);
    data.append("Adl2", formData.addressLine2);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("zipcode", formData.zipcode);
    data.append("country", formData.country);
    const filePath = "";
    data.append("file.path", filePath);
    
    try {
      const response = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:JlpFmq7N/details", {
        method: "POST",
        body: data,
      });

      if (response.status == 200) {
        const result = await response.json();
        alert("Form submitted Successfully");
        console.log("Form submitted successfully:", result);
        
      } else {
        const errorData = await response.json();
        console.error("Submission error:", errorData);
        alert("Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 5: Submit</h2>
      <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 rounded">
        Final Submit Here
      </button>
    </div>
  );
};

export default Step5;
