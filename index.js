let mainCategory = document.querySelector(".category");
let categorybar = document.querySelector("#categoryContainer");
console.log(categorybar);
let categoriesdata = {
  men: "",
  women: "",
};

window.onload = function () {
  fetchCategorie().then((data) => {
    data?.forEach((elementValue) => {
      mainCategory.innerHTML += `<p>${elementValue}</p>`;
    });
  });
};

$(document).ready(function () {
  $(mainCategory).on("mouseover", function (e) {
    let choosen;
    categorybar.innerHTML = "";
    if (
      e.target.nodeName === "P" &&
      (e.target.innerHTML.toLowerCase() === "men" ||
        e.target.innerHTML.toLowerCase() === "women")
    ) {
      choosen = e.target.innerHTML.toLowerCase();
      console.log(choosen);
      categoryDropdown(categoriesdata[choosen]);
      $(categorybar).slideDown();
    } else {
      $(categorybar).slideUp();
    }
  });
});


function categoryDropdown(data) {
  let subCategories = data.subCategory;
  let childCategories = data.childCategory;

  let categoryContainer = $("#categoryContainer");

  $.each(subCategories, function (index, parentCategory) {
    let categoryColumn = $("<div>").addClass("category-column");

    let parentDiv = $("<div>")
      .addClass("parent")
      .text(parentCategory.categoryName);

    let childDiv = $("<div>").addClass("child");

    let filteredChildren = $.grep(childCategories, function (childCategory) {
      return childCategory.parentId === parentCategory.id;
    });

    $.each(filteredChildren, function (index, child) {
      let childSpan = $("<span>").text(child.categoryName);
      childDiv.append(childSpan);
    });

    categoryColumn.append(parentDiv);
    categoryColumn.append(childDiv);

    categoryContainer.append(categoryColumn);
  });
}

$(document).ready(async function () {
  const categories = ["men", "women"];
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    categoriesdata[category] = await fetchCategories(category);
  }
});


