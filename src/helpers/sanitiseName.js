const sanitiseName = (name) => {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s\-]/g, '')
    .replace(/[^\w\S]/g, '-')
    .replace(/-{2,}/g, '');
};

export default sanitiseName;
