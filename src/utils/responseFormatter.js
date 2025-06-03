export const formatResponse = (data, message = 'Sucesso') => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

export const formatError = (message, details = null) => {
  return {
    success: false,
    error: message,
    details,
    timestamp: new Date().toISOString()
  };
};
