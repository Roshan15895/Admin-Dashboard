
const Step2: React.FC<{ formData: any; setFormData: any }> = ({ formData, setFormData }) => {


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 2: Address</h2>
      <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
      AddressLine1*
      </label>
      <input
        type="text"
        name="addressLine1"
        value={formData.addressLine1 || ""}
        onChange={handleChange}
        placeholder="Address Line 1"
        className="w-full p-2 border rounded mb-4"
        required
      />
      <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
      AddressLine2*
      </label>
      <input
        type="text"
        name="addressLine2"
        value={formData.addressLine2 || ""}
        onChange={handleChange}
        placeholder="Address Line 2"
        className="w-full p-2 border rounded mb-4"
        required
      />
      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
      City*
      </label>
      <input
        type="text"
        name="city"
        value={formData.city || ""}
        onChange={handleChange}
        placeholder="City"
        className="w-full p-2 border rounded mb-4"
        required
      />
      <label htmlFor="state" className="block text-sm font-medium text-gray-700">
      State*
      </label>
      <input
        type="text"
        name="state"
        value={formData.state || ""}
        onChange={handleChange}
        placeholder="State"
        className="w-full p-2 border rounded mb-4"
        required
      />
      <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
      ZipCode
      </label>
      <input
        type="text"
        name="zipcode"
        value={formData.zipcode || ""}
        onChange={handleChange}
        placeholder="Zip Code"
        className="w-full p-2 border rounded mb-4"
      />
      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
      Country
      </label>
      <input
        type="text"
        name="country"
        value={formData.country || ""}
        onChange={handleChange}
        placeholder="Country"
        className="w-full p-2 border rounded mb-4"
      />
    </div>
  );
};

export default Step2;
