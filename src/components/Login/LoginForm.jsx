import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpa erros quando o usuário começa a digitar
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Simulação de login bem-sucedido
    // Em um app real, você faria uma chamada à API aqui
    console.log('Login com:', formData);
    alert('Login realizado com sucesso!');
    
    // Redirecionar para a página principal após login
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="Seu e-mail de cadastro"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className={errors.senha ? 'error' : ''}
            placeholder="Sua senha"
          />
          {errors.senha && <span className="error-message">{errors.senha}</span>}
        </div>
        
        <button type="submit" className="login-button">Entrar</button>
      </form>
      
      <div className="login-footer">
        <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
        <p><Link to="/forgot-password">Esqueceu sua senha?</Link></p>
      </div>
    </div>
  );
}

export default LoginForm;
