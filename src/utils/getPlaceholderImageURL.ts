export const getPlaceholderImageURL = (imageURL: string): string => {
  return `/_next/image?url=${encodeURIComponent(imageURL)}&q=1`;
};
