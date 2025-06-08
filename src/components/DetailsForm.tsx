import {useEffect, useState,} from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../context/FormDataContext';
import { ArrowLeft, Upload, Check, Calculator as Calculate } from 'lucide-react';
import FormDetailsComp from "./FormDetailsComp.tsx";
import axios from "axios";

// Sample product data



const DetailsForm = () => {
  const { formData, shopDetails, updateFormData, resetFormData, updateShopDetails } = useFormData();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log(" product details are ::::  ",productDetails);
    }, [productDetails]);

  const getProductDetails = async () => {
      const response = await axios.get(
          `http://localhost:3000/products/productDetails`
      );
      setProductDetails(response.data);
      setLoading(true);
  }

    useEffect(() => {
        getProductDetails().then(r => console.log(r));
    }, []);

    useEffect(() => {
        console.log("form data are in details form :::: ", formData," :::: shop Details are ::: ", shopDetails);
    }, [formData, shopDetails]);

  const goBack = () => {
    navigate('/');
  };

  const calculateRate = () => {
    if (!formData.productName) {
      setErrors(prev => ({ ...prev, productName: 'Please select a product' }));
      return;
    }

    const selectedProduct = productDetails.find(p => p.name === formData.productName);
    if (selectedProduct) {
      const calculated = selectedProduct.rate * shopDetails.quantity;
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

      console.log("final form data for submitting are :::: ", formData, "final shop details for submitting ::: ", shopDetails)
      // Show success state briefly before redirecting
      setSuccess(true);
        // resetFormData();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormDataChange = (field: string, value: any) => {
      updateFormData({captcha: "", [field]: value });
  }

  const handleShopDetailsChange = (field: string, value: any) => {
      console.log({field: field, value: value});
      updateShopDetails({
          quantity: value
      });
    // updateFormData({imagePreview: undefined, [field]: value });
    
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
            <FormDetailsComp    formData={formData} shopDetails={shopDetails}/>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>Product Details</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#374151',
                        marginBottom: '0.25rem'
                    }}>
                        Product Name
                    </label>
                    <select
                        value={formData.productName}
                        onChange={(e) => handleFormDataChange("productName", e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.375rem",
                            border: errors.productName
                                ? "1px solid #ef4444"
                                : "1px solid #d1d5db",
                            outline: "none",
                        }}
                        disabled={!loading} // Disable while loading
                    >
                        {!loading ? (
                            <option>Loading...</option>
                        ) : (
                            <>
                                <option value="">Select a product</option>
                                {productDetails.map((product) => (
                                    <option key={product._id} value={product.name}>
                                        {product.name}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                    {errors.productName && (
                        <p style={{
                            marginTop: '0.25rem',
                            fontSize: '0.875rem',
                            color: '#dc2626'
                        }}>{errors.productName}</p>
                    )}
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#374151',
                        marginBottom: '0.25rem'
                    }}>
                        Quantity
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={shopDetails.quantity || ''}
                        onChange={(e) => handleShopDetailsChange('quantity', parseInt(e.target.value) || 0)}
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
                    <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>₹{formData.calculatedRate.toFixed(2)}</p>
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
                  value={formData.phoneNumber}
                  onChange={(e) => handleFormDataChange('phoneNumber', e.target.value)}
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
};

export default DetailsForm;