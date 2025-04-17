import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LoginForm = ({ onLogin, switchToSignup }) => {
  const [formData, setFormData]
