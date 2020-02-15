module.exports = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://quotesmachineapp.herokuapp.com';
}