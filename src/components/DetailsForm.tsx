import {useEffect, useState,} from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/FormDataContext';
import { ArrowLeft, Upload, Check, Calculator as Calculate } from 'lucide-react';
import FormDetailsComp from "./FormDetailsComp.tsx";

// Sample product data
const PRODUCTS = [
  { id: 1, name: 'Tea', rate: 100 },
  { id: 2, name: 'Detergent', rate: 150 },
  // { id: 3, name: 'Product C', rate: 200 },
];

const DetailsForm = () => {
  const { formData, updateFormData, resetFormData } = useFormData();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        console.log("form data are :::: ", formData);
    }, [formData]);

  const goBack = () => {
    navigate('/');
  };

  const calculateRate = () => {
    if (!formData.productName) {
      setErrors(prev => ({ ...prev, productName: 'Please select a product' }));
      return;
    }
    
    if (!formData.quantity || formData.quantity <= 0) {
      setErrors(prev => ({ ...prev, quantity: 'Please enter a valid quantity' }));
      return;
    }
    
    const selectedProduct = PRODUCTS.find(p => p.name === formData.productName);
    if (selectedProduct) {
      const calculated = selectedProduct.rate * formData.quantity;
      updateFormData({ 
        rate: selectedProduct.rate,
        calculatedRate: calculated 
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData({ 
          image: file,
          imagePreview: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success state briefly before redirecting
      setSuccess(true);
      
      setTimeout(() => {
        resetFormData();
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: any) => {
      console.log({field: field, value: value});
    updateFormData({imagePreview: undefined, [field]: value });
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  return (
      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ padding: '1.5rem' }}>
          <button
              onClick={goBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#2563eb',
                marginBottom: '1.5rem',
                transition: 'color 0.2s'
              }}
          >
            <ArrowLeft size={16} style={{ marginRight: '0.25rem' }} /> Back to form
          </button>
            <FormDetailsComp data={formData} />

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>Product Details</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>
                  Product Name
                </label>
                <select
                    value={formData.productName}
                    onChange={(e) => handleChange('productName', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      border: errors.productName ? '1px solid #ef4444' : '1px solid #d1d5db',
                      outline: 'none'
                    }}
                >
                  <option value="">Select a product</option>
                  {PRODUCTS.map(product => (
                      <option key={product.id} value={product.name}>
                        {product.name}
                      </option>
                  ))}
                </select>
                {errors.productName && (
                    <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#dc2626' }}>{errors.productName}</p>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>
                  Quantity
                </label>
                <input
                    type="number"
                    min="1"
                    value={formData.quantity || ''}
                    onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
                    style={{
                      width: '100%',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      border: errors.quantity ? '1px solid #ef4444' : '1px solid #d1d5db',
                      outline: 'none'
                    }}
                />
                {errors.quantity && (
                    <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#dc2626' }}>{errors.quantity}</p>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
              <button
                  type="button"
                  onClick={calculateRate}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#0d9488',
                    color: 'white',
                    borderRadius: '0.375rem'
                  }}
              >
                <Calculate size={18} /> Calculate Rate
              </button>

              {formData.calculatedRate > 0 && (
                  <div style={{ backgroundColor: '#eff6ff', padding: '0.75rem', borderRadius: '0.375rem', flexGrow: 1 }}>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Calculated Rate:</p>
                    <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>${formData.calculatedRate.toFixed(2)}</p>
                  </div>
              )}
            </div>
            {errors.calculatedRate && (
                <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#dc2626' }}>{errors.calculatedRate}</p>
            )}

            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#1f2937' }}>Upload Image</h3>
                {formData.imagePreview && (
                    <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                <Check size={16} style={{ marginRight: '0.25rem' }} /> Image uploaded
              </span>
                )}
              </div>

              <div style={{ border: '2px dashed #d1d5db', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center', position: 'relative' }}>
                {formData.imagePreview ? (
                    <div>
                      <img
                          src={formData.imagePreview}
                          alt="Preview"
                          style={{ maxHeight: '10rem', margin: '0 auto 0.5rem', borderRadius: '0.375rem' }}
                      />
                      <button
                          type="button"
                          onClick={() => updateFormData({ image: null, imagePreview: null })}
                          style={{ color: '#dc2626', fontSize: '0.875rem' }}
                      >
                        Remove image
                      </button>
                    </div>
                ) : (
                    <div>
                      <Upload style={{ margin: '0 auto', height: '3rem', width: '3rem', color: '#9ca3af' }} />
                      <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        Click to upload or drag and drop
                      </p>
                      <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                      />
                    </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>
                Phone Number
              </label>
              <input

                  value={"316"}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  placeholder="Enter 10-digit phone number"
                  style={{
                    width: '100%',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    border: errors.phoneNumber ? '1px solid #ef4444' : '1px solid #d1d5db',
                    outline: 'none'
                  }}
              />
              {errors.phoneNumber && (
                  <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#dc2626' }}>{errors.phoneNumber}</p>
              )}
            </div>

            <div style={{ paddingTop: '1rem' }}>
              <button
                  type="submit"
                  disabled={isSubmitting || success}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    fontWeight: 500,
                    backgroundColor: success ? '#22c55e' : '#2563eb',
                    color: 'white',
                    cursor: isSubmitting || success ? 'not-allowed' : 'pointer'
                  }}
              >
                {isSubmitting ? 'Submitting...' : success ? 'Success! Redirecting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );


  // return (
  //   <div className="bg-white rounded-lg shadow-md">
  //     <div className="p-6 md:p-8">
  //       <button
  //         onClick={goBack}
  //         className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
  //       >
  //         <ArrowLeft size={16} className="mr-1" /> Back to form
  //       </button>
  //
  //       <div className="mb-8">
  //         <h2 className="text-xl font-semibold text-gray-800 mb-4">Form Summary</h2>
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
  //           <div>
  //             <p className="text-sm text-gray-500">Field 1</p>
  //             <p className="font-medium">{formData.field1}</p>
  //           </div>
  //           <div>
  //             <p className="text-sm text-gray-500">Field 2</p>
  //             <p className="font-medium">{formData.field2}</p>
  //           </div>
  //           <div>
  //             <p className="text-sm text-gray-500">Field 3</p>
  //             <p className="font-medium">{formData.field3}</p>
  //           </div>
  //           <div>
  //             <p className="text-sm text-gray-500">Field 4</p>
  //             <p className="font-medium">{formData.field4}</p>
  //           </div>
  //           <div>
  //             <p className="text-sm text-gray-500">Field 5</p>
  //             <p className="font-medium">{formData.field5}</p>
  //           </div>
  //         </div>
  //       </div>
  //
  //       <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Details</h2>
  //
  //       <form onSubmit={handleSubmit} className="space-y-5">
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               Product Name
  //             </label>
  //             <select
  //               value={formData.productName}
  //               onChange={(e) => handleChange('productName', e.target.value)}
  //               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
  //                 errors.productName ? 'border-red-500' : 'border-gray-300'
  //               }`}
  //             >
  //               <option value="">Select a product</option>
  //               {PRODUCTS.map(product => (
  //                 <option key={product.id} value={product.name}>
  //                   {product.name}
  //                 </option>
  //               ))}
  //             </select>
  //             {errors.productName && (
  //               <p className="mt-1 text-sm text-red-600">{errors.productName}</p>
  //             )}
  //           </div>
  //
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               Quantity
  //             </label>
  //             <input
  //               type="number"
  //               min="1"
  //               value={formData.quantity || ''}
  //               onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
  //               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
  //                 errors.quantity ? 'border-red-500' : 'border-gray-300'
  //               }`}
  //             />
  //             {errors.quantity && (
  //               <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
  //             )}
  //           </div>
  //         </div>
  //
  //         <div className="flex items-end gap-4">
  //           <button
  //             type="button"
  //             onClick={calculateRate}
  //             className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
  //           >
  //             <Calculate size={18} /> Calculate Rate
  //           </button>
  //
  //           {formData.calculatedRate > 0 && (
  //             <div className="bg-blue-50 p-3 rounded-md flex-grow">
  //               <p className="text-sm text-gray-600">Calculated Rate:</p>
  //               <p className="text-lg font-semibold">${formData.calculatedRate.toFixed(2)}</p>
  //             </div>
  //           )}
  //         </div>
  //         {errors.calculatedRate && (
  //           <p className="mt-1 text-sm text-red-600">{errors.calculatedRate}</p>
  //         )}
  //
  //         <div className="mt-6 pt-6 border-t border-gray-200">
  //           <div className="flex items-center justify-between mb-4">
  //             <h3 className="text-lg font-medium text-gray-800">Upload Image</h3>
  //             {formData.imagePreview && (
  //               <span className="text-green-600 flex items-center text-sm">
  //                 <Check size={16} className="mr-1" /> Image uploaded
  //               </span>
  //             )}
  //           </div>
  //
  //           <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
  //             {formData.imagePreview ? (
  //               <div>
  //                 <img
  //                   src={formData.imagePreview}
  //                   alt="Preview"
  //                   className="max-h-40 mx-auto mb-2 rounded"
  //                 />
  //                 <button
  //                   type="button"
  //                   onClick={() => updateFormData({ image: null, imagePreview: null })}
  //                   className="text-red-600 text-sm hover:text-red-800"
  //                 >
  //                   Remove image
  //                 </button>
  //               </div>
  //             ) : (
  //               <div>
  //                 <Upload className="mx-auto h-12 w-12 text-gray-400" />
  //                 <p className="mt-1 text-sm text-gray-500">
  //                   Click to upload or drag and drop
  //                 </p>
  //                 <input
  //                   type="file"
  //                   accept="image/*"
  //                   onChange={handleImageChange}
  //                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
  //                 />
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //
  //         <div className="mt-4">
  //           <label className="block text-sm font-medium text-gray-700 mb-1">
  //             Phone Number
  //           </label>
  //           <input
  //             type="tel"
  //             value={formData.phoneNumber}
  //             onChange={(e) => handleChange('phoneNumber', e.target.value)}
  //             placeholder="Enter 10-digit phone number"
  //             className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
  //               errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
  //             }`}
  //           />
  //           {errors.phoneNumber && (
  //             <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
  //           )}
  //         </div>
  //
  //         <div className="pt-4">
  //           <button
  //             type="submit"
  //             disabled={isSubmitting || success}
  //             className={`w-full py-3 px-6 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
  //               success
  //                 ? 'bg-green-500 text-white'
  //                 : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
  //             }`}
  //           >
  //             {isSubmitting ? 'Submitting...' : success ? 'Success! Redirecting...' : 'Submit'}
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default DetailsForm;