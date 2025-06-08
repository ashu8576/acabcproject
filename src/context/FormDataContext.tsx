import { createContext, useState, useContext, ReactNode } from 'react';

// Define types for our form data
export interface FormData {
  yojna: string;
  vitteeyVarsh: string;
  aavtanMaah: string;
  dukaanSankhya: string;
  captcha: string;
  productName: string;
  rate: number;
  calculatedRate: number;
  phoneNumber: string;
  image: File | null;
  imagePreview: string | null;
}

export interface shopDetails {
  district: string,
  block: string,
  gramPanchayat: string,
  shopOwnerName: string,
  shopNumber: string,
  cardType: string,
  quantity: number,
}

interface FormDataContextType {
  shopDetails: shopDetails;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;
  updateShopDetails: (data: Partial<shopDetails>)=> void;
}

const initialFormData: FormData = {
  yojna: '',
  vitteeyVarsh: '',
  aavtanMaah: '',
  dukaanSankhya: '',
  captcha: '',
  productName: '',
  rate: 100, // Default rate
  calculatedRate: 0,
  phoneNumber: '',
  image: null,
  imagePreview: null
};
 const initialShopDetails: shopDetails = {
   block: "",
   cardType: "",
   district: "",
   gramPanchayat: "",
   quantity: 0,
   shopNumber: "",
   shopOwnerName: ""

 }

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [shopDetails, setShopDetails] = useState<shopDetails>(initialShopDetails)

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  const updateShopDetails = (data: Partial<shopDetails>) => {
    setShopDetails(prevData => ({
      ...prevData,
      ...data
    }) )
  }

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData, resetFormData, shopDetails, updateShopDetails }}>
      {children}
    </FormDataContext.Provider>
  );
};