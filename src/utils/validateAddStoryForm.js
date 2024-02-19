export default function validateAddStoryForm(values, currImg) {
  const errors = {};
  if (!values.heading.trim()) {
    errors.heading = "Heading is required";
  }
  if (!values.description.trim()) {
    errors.description = "Description is required";
  }
  if (!values.category.trim()) {
    errors.category = "Category is required";
  }
  if (!values.images[0]) {
    errors.images = "Image url is required";
  } else if (values.images[currImg - 1] === "") {
    errors.images = "Image url is required";
  }

  return errors;
}
