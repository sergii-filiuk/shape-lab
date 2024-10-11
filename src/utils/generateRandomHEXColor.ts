export const generateRandomHEXColor = () => {
  // Generate a random number between 0 and 0xFFFFFF
  const randomColor = Math.floor(Math.random() * 0xffffff);

  // Convert the number to a hex string and pad with leading zeros if necessary
  const hexColor = `#${randomColor.toString(16).padStart(6, '0')}`;

  return hexColor;
};
