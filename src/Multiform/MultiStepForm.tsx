import React, { useState } from "react";
import Step1 from "./Step1"; 
import Step2 from "./Step2"; 
import Step3 from "./Step3"; 
import Step4 from "./Step4"; 
import Step5 from "./Step5"; 
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom"; 

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const totalSteps = 5;
  const navigate = useNavigate(); 

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault(); 
    setErrorMessage(''); 

    if (currentStep === 1) {
      if (!formData.name) {
        setErrorMessage('Name is required.');
        return;
      }
      if (!validateEmail(formData?.email)) {
        setErrorMessage('Please enter a valid email.');
        return;
      }
    }

    if (currentStep === 2) {
      if (!formData.addressLine1) {
        setErrorMessage('Address Line 1 is required.');
        return;
      }
      if (!formData.addressLine2) {
        setErrorMessage('Address Line 2 is required.');
        return;
      }
      if (!formData.city) {
        setErrorMessage('City is required.');
        return;
      }
      if (!formData.state) {
        setErrorMessage('State is required.');
        return;
      }
      if (!formData.zipcode || !/^[0-9]{6}$/.test(formData.zipcode)) {
        setErrorMessage("Zipcode must be 6 digits and numeric.");
        return;
      }
      if (!formData.country) {
        setErrorMessage("Country name is required.");
        return;
      }
    }

    if (currentStep === 3 && !formData.file) {
      setErrorMessage('Please upload a file.');
      return;
    }

    if (currentStep === 4 && !formData.files) {
      setErrorMessage('Please upload a file.');
      return;
    }

    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
        console.log("Form submitted successfully:", result);
        navigate("/thank-you"); 
      } else {
        const errorData = await response.json();
        console.error("Submission error:", errorData);
        setErrorMessage("Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <form onSubmit={currentStep === totalSteps ? handleSubmit : nextStep}>
        <div className="mt-5">
          {currentStep === 1 && <Step1 formData={formData} setFormData={setFormData} />}
          {currentStep === 2 && <Step2 formData={formData} setFormData={setFormData} />}
          {currentStep === 3 && <Step3 formData={formData} setFormData={setFormData} />}
          {currentStep === 4 && <Step4 formData={formData} setFormData={setFormData} />}
          {currentStep === 5 && <Step5 formData={formData} setFormData={setFormData} />}
          {errorMessage && <h2 className="text-red-500">{errorMessage}</h2>}
          <div className="mt-5 flex justify-between">
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-400 text-white rounded"
              disabled={currentStep === 1}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {currentStep === totalSteps ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
