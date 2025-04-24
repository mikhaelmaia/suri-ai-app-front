// Validação de e-mail
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validação de CPF
export const validateCPF = (cpf) => {
  // Remove caracteres não numéricos
  const cpfClean = cpf.replace(/[^\d]/g, '');
  
  // Verifica se tem 11 dígitos
  if (cpfClean.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpfClean)) return false;
  
  // Implementação simplificada - em produção, use uma validação completa de CPF
  return true;
};

// Validação de telefone
export const validatePhone = (phone) => {
  // Remove caracteres não numéricos
  const phoneClean = phone.replace(/[^\d]/g, '');
  
  // Verifica se tem entre 10 e 11 dígitos (com ou sem DDD)
  return phoneClean.length >= 10 && phoneClean.length <= 11;
};

// Validação de senha
export const validatePassword = (password) => {
  // Pelo menos 8 caracteres, com letras, números e caracteres especiais
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(password);
};
