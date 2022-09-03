// elements
const categoryList = document.getElementById('categoryList');

fetch('https://openapi.programming-hero.com/api/news/categories')
  .then(res => res.json())
  .then(data => categories(data.data.news_category));

const categories = categoriesList => {
  // console.log(categoriesList);
  for (const categoryName of categoriesList) {
    // console.log(categoryName.category_name);
    const categoryBtn = document.createElement('div');
    categoryBtn.innerHTML = `
            <a href="#" id="categoryButton" class="text-decoration-none" data-id="${categoryName.category_id}" > ${categoryName.category_name}</a>
        `;

    categoryList.appendChild(categoryBtn);
  }
};

categoryList.addEventListener('click', e => {
  if (!e.target.dataset.id) return;

  categoriesLists(e.target.dataset.id);
});

// Items
const categoriesLists = async listNumber => {
  renderSpinner('#post-items');

  console.log(listNumber);
  const url = `https://openapi.programming-hero.com/api/news/category/${listNumber}`;
  const res = await fetch(url);
  const data = await res.json();

  console.log(data.data);
  postItems(data.data);
};

const renderSpinner = selector => {
  document.querySelector(
    selector
  ).innerHTML = `<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`;
};

const postItems = itemsList => {
  // console.log(itemsList.length);
  const itemLengthDiv = document.getElementById('item-count');
  const itemsLength = itemsList.length;
  itemLengthDiv.innerText = itemsLength + ' items found for category';

  const postItems = document.getElementById('post-items');

  postItems.innerHTML = '';

  for (const items of itemsList) {
    //   console.log(items.length);
    const postDiv = document.createElement('div');

    postDiv.innerHTML = `
    <div class="card mb-3">
      <div
        class="modal fade"
        id="modal-${items._id}"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Read More</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">${items.details}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-0">
          <div class="col-md-4">
              <img src=" ${
                items.thumbnail_url
              } " class="img-fluid rounded-start w-100 px-2" alt="...">
          </div>
          <div class="col-md-8">
              <div class="card-body h-100 d-flex flex-column justify-content-between p-4">
                  <div class="card-content">
                      <h3 class="card-title pb-4"> ${items.title} </h3>
                      <p class="card-text"> ${items.details.slice(
                        0,
                        300
                      )}...</p>
                  </div>
                  <div class="author-details">
                      <div class="container">
                          <div class="row d-flex justify-content-around">
                              <div class="col-md-3 text-center d-flex flex-column">
                                  <div class="author-imag rounded-2 d-flex">
                                      <img src="${
                                        items.author.img
                                      }" class="w-25 rounded-circle">
                                      <h4 style='font-size: 1.1rem; padding-left: 5px;'>  ${
                                        items.author.name
                                      } </h4>
                                  </div>
                                  <div class="author-details">
                                      <div class="dates"> ${
                                        items.author.published_date
                                      } </div>
                                  </div>
                              </div>
                              <div class="col-md-3 text-text d-flex justify-content-center align-items-center">
                                  <div class="content">
                                      <i class="fa fab-light fa-eye"></i>
                                      <span id="views"> 12 M </span>
                                  </div>
                              </div>
                              <div class="col-md-3 text-center d-flex justify-content-center align-items-center">
                              <div class="content">
                                      <i class="fa fab-regular fa-star"></i>
                                      <i class="fa fab-regular fa-star"></i>
                                      <i class="fa fab-regular fa-star"></i>
                                      <i class="fa fab-regular fa-star"></i>
                                      <i class="fa fab-regular fa-star"></i>
                                  </div>
                              </div>
                              <div class="col-md-3 text-center d-flex justify-content-center align-items-center">
                                  <div class="content" id="more-content">
                                      
                                  <button type="button" class="bg-transparent border-0 outline-0" data-bs-toggle="modal" data-bs-target="#modal-${
                                    items._id
                                  }">
                                    <i class="fa fab-regular fa-arrow-right"></i>
                                  </button>
                                  
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
        `;

    postItems.appendChild(postDiv);
  }
};

categoriesLists();
