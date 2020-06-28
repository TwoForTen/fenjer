const constrictName = (name) => {
  const MAX_LENGTH = 40;

  if (name.split('').length > MAX_LENGTH) {
    return name.split('').slice(0, MAX_LENGTH).join('') + '...';
  }

  return name;
};

export default constrictName;
