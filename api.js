async function fetchCategorie() {
  try {
    const response = await fetch(
      "https://ecomm.dotvik.com/v2kart/service/categories/mainCategories"
    );
    const data = await response.json();
    const categories = data?.data?.map((category) => category.categoryName);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

async function fetchCategories(paylaod = "men") {
  try {
    const response = await fetch(
      `https://ecomm.dotvik.com/v2kart/service/categories/${paylaod}/tree`
    );
    const data = await response.json();
    const subCategory = data?.data?.subCategory;
    const childCategory = data?.data?.childCategory;
    return { childCategory, subCategory };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
