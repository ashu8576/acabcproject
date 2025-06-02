import { createContext, useState, useContext, ReactNode } from 'react';

// Define types for our form data
export interface FormData {
  yojna: string;
  vitteeyVarsh: string;
  aavtanMaah: string;
  dukaanSankhya: string;
  captcha: string;
  productName: string;
  quantity: number;
  rate: number;
  calculatedRate: number;
  phoneNumber: string;
  image: File | null;
  imagePreview: string | null;
}

interface FormDataContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;
}

const initialFormData: FormData = {
  yojna: '',
  vitteeyVarsh: '',
  aavtanMaah: '',
  dukaanSankhya: '',
  captcha: '',
  productName: '',
  quantity: 0,
  rate: 100, // Default rate
  calculatedRate: 0,
  phoneNumber: '',
  image: null,
  imagePreview: null
};

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

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};