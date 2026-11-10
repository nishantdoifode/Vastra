export const optimizeImage = (url, width = 800, quality = 80) => {
  if (!url) return '';
  
  // For Picsum images
  if (url.includes('picsum.photos')) {
    return url.replace(/\/\d+\/\d+$/, `/${width}/${Math.round(width * 1.33)}`);
  }
  
  // For Unsplash images
  if (url.includes('unsplash.com')) {
    return `${url}&w=${width}&q=${quality}&auto=format&fit=crop`;
  }
  
  return url;
};