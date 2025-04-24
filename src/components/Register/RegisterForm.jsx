import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Adicione o import do Link
import './RegisterForm.css';

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    senha: '',
  });

  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasUpperCase && hasNumber;
  };

  const formatCPF = (value) => {
    const cpfNumbers = value.replace(/\D/g, '');
    
    const cpfLimited = cpfNumbers.slice(0, 11);
    
    let formattedCPF = '';
    for (let i = 0; i < cpfLimited.length; i++) {
      if (i === 3 || i === 6) formattedCPF += '.';
      if (i === 9) formattedCPF += '-';
      formattedCPF += cpfLimited[i];
    }
    
    return formattedCPF;
  };

  const formatPhone = (value) => {
    const phoneNumbers = value.replace(/\D/g, '');
    const phoneLimited = phoneNumbers.slice(0, 11);
    
    let formattedPhone = '';
    for (let i = 0; i < phoneLimited.length; i++) {
      if (i === 0) formattedPhone += '(';
      if (i === 2) formattedPhone += ') ';
      if (i === 7) formattedPhone += '-';
      formattedPhone += phoneLimited[i];
    }
    
    return formattedPhone;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      const formattedValue = formatCPF(value);
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
      
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length !== 11 && digitsOnly.length > 0) {
        setErrors({
          ...errors,
          cpf: 'CPF deve ter 11 dígitos',
        });
      } else {
        setErrors({
          ...errors,
          cpf: '',
        });
      }
    } 
    else if (name === 'telefone') {
      const formattedValue = formatPhone(value);
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
      
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length !== 11 && digitsOnly.length > 0) {
        setErrors({
          ...errors,
          telefone: 'Telefone deve ter 11 dígitos',
        });
      } else {
        setErrors({
          ...errors,
          telefone: '',
        });
      }
    }
    else if (name === 'senha') {
      setFormData({
        ...formData,
        [name]: value,
      });
      
      if (value && !validatePassword(value)) {
        setErrors({
          ...errors,
          senha: 'A senha deve conter pelo menos uma letra maiúscula e um número',
        });
      } else {
        setErrors({
          ...errors,
          senha: '',
        });
      }
    } 
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    const cpfDigits = formData.cpf.replace(/\D/g, '');
    if (cpfDigits.length !== 11) {
      newErrors.cpf = 'CPF deve ter 11 dígitos';
    }
    
    const phoneDigits = formData.telefone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      newErrors.telefone = 'Telefone deve ter 11 dígitos';
    }
    
    if (!validatePassword(formData.senha)) {
      newErrors.senha = 'A senha deve conter pelo menos uma letra maiúscula e um número';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const submissionData = {
      ...formData,
      cpf: cpfDigits,
      telefone: phoneDigits
    };
    
    alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
    console.log(submissionData);
    
    setFormData({
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      senha: '',
    });
    setErrors({});
    
    setTimeout(() => {
      navigate('/login');
    }, 1000); // Pequeno delay para o usuário ver a mensagem
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="form-group">
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className={errors.nome ? 'error' : ''}
        />
        {errors.nome && <span className="error-message">{errors.nome}</span>}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>CPF</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
          className={errors.cpf ? 'error' : ''}
          placeholder="000.000.000-00"
        />
        {errors.cpf && <span className="error-message">{errors.cpf}</span>}
        <small className="input-hint">Digite apenas os números do CPF</small>
      </div>

      <div className="form-group">
        <label>Telefone</label>
        <input
          type="text"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
          className={errors.telefone ? 'error' : ''}
          placeholder="(00) 00000-0000"
        />
        {errors.telefone && <span className="error-message">{errors.telefone}</span>}
        <small className="input-hint">Digite apenas os números do telefone</small>
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          required
          className={errors.senha ? 'error' : ''}
        />
        {errors.senha && <span className="error-message">{errors.senha}</span>}
        <small className="password-hint">A senha deve conter pelo menos uma letra maiúscula e um número</small>
      </div>

      <button type="submit">Cadastrar</button>
      
      {/* Adicionando o link para a página de login */}
      <div className="form-footer">
        <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
      </div>
    </form>
  );
}

export default RegisterForm;
