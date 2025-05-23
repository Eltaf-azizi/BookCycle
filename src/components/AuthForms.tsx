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