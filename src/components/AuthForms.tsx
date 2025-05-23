import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { pakistanCities } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
}

const AuthForms: React.FC<AuthModalProps> = ({ isOpen, onClose, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    city: '',
    password: '',
  });
  
  const { login, signup, isLoading } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (type === 'login') {
        await login(formData.email, formData.password);
        setSuccess('Login successful!');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else if (type === 'signup') {
        await signup(formData, formData.password);
        setSuccess('Sign up successful!');
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };