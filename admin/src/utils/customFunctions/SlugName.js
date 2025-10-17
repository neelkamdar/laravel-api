export const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") 
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with '-'
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing '-'
  };