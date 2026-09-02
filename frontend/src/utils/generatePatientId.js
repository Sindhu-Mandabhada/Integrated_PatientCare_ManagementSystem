export const generatePatientId = () => {
  const year = new Date().getFullYear();

  const randomNumber = Math.floor(
    1000 + Math.random() * 9000
  );

  return `PAT-${year}-${randomNumber}`;
};

export default generatePatientId;