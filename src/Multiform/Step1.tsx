import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface Step1Props {
  formData: any;
  setFormData: (data: any) => void;
  
}

const Step1: React.FC<Step1Props> = ({ formData, setFormData }) => {
  const [phoneError, setPhoneError] = useState<string>("");

  
  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (value: string, country: any) => {
    
    setFormData({
      ...formData,
      phoneNumber: value,
      countryCode: country.dialCode, 
    });

    
    const phoneWithoutCountryCode = value.replace(country.dialCode, "");
    if (!validatePhoneNumber(phoneWithoutCountryCode)) {
      setPhoneError("Phone number must be 10 digits.");
    } else {
      setPhoneError("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 1: Basic Details</h2>
      
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name*
      </label>
      <input
        type="text"
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded mb-4"
        required
      />
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded mb-4"
      />

      
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        Phone Number
      </label>

      <div className="mt-2">
        <PhoneInput
          country={"in"} 
          value={formData.phoneNumber || ""} 
          onChange={(value, country) => handlePhoneChange(value, country)}
          inputProps={{
            name: "phone",
            required: true,
            autoFocus: true,
          }}
          containerClass="w-full border border-gray-300 rounded-md"
          inputClass="w-full h-10 p-2 border-none focus:outline-none"
        />
      </div>

      
      {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
    </div>
  );
};

export default Step1;
