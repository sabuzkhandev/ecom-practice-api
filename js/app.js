const loadProductAPI = async(search,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    loadProduct(data.data,dataLimit);
}

const loadProduct = (phones,dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ``;
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 8){
        phones = phones.slice(0,8);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }
    // display no phone found
    const noFoundPhone = document.getElementById('search-no-found');
    if(phones.length === 0){
        noFoundPhone.classList.remove('d-none');
    }else{
        noFoundPhone.classList.add('d-none')
    }
    phones.forEach(phone =>{
         //console.log(phones);
        const phonediv = document.createElement('div');
        phonediv.classList.add('col');
        phonediv.innerHTML = `
        <div class="card rounded-0">
            <img src="${phone.image}" class="card-img-top rounded-0 px-5 py-3" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a onclick=loadPhoneDetails('${phone.slug}') href="#" class="btn btn-primary rounded-0 custom" data-bs-toggle="modal" data-bs-target="#productDetailsModal">Product Details</a>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phonediv);
        
    })
    dataLoader(false);
}

const showAllProduct = (dataLimit) =>{
    dataLoader(true);
    const productSearching = document.getElementById('searching');
    const search = productSearching.value;
    loadProductAPI(search,dataLimit);
    // productSearching.value = '';
}
document.getElementById('product-search').addEventListener('click',function(){
    showAllProduct(8);
});

document.getElementById('searching').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        showAllProduct(8);
    }
});

const dataLoader = loader =>{
    const spinnerLoad = document.getElementById('spinning-loader');
    if(loader){
        spinnerLoad.classList.remove('d-none');
    }else{
        spinnerLoad.classList.add('d-none');
    }
}

document.getElementById('show-all').addEventListener('click',function(){
    showAllProduct();
});

const loadPhoneDetails = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    getPhoneDetails(data.data);
}

const getPhoneDetails = phoneDetails =>{
    console.log(phoneDetails)
    const phoneDetailsTitle = document.getElementById('productDetailsModalLabel');
    phoneDetailsTitle.innerText = phoneDetails.brand;
    const phoneDetailsBox = document.getElementById('phone-details');
    phoneDetailsBox.innerHTML = `
    <div class="card rounded-0  border-0">
    <div class="row g-0">
      <div class="col-md-3">
        <img src="${phoneDetails.image}" class="img-fluid rounded-0 p-3" alt="...">
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <h5 class="card-title">${phoneDetails.name}</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text">Slug: <small class="text-danger">${phoneDetails.slug}</small></p>
          <p class="card-text">ChipSet: <strong class="text-primary">${phoneDetails.mainFeatures.chipSet}</strong></p>
          <p class="card-text">Display Size: <strong class="text-success">${phoneDetails.mainFeatures.displaySize}</strong></p>
          <p class="text-dark"><strong>Stronge: </strong> ${phoneDetails.mainFeatures.memory}</p>
          <button class="btn btn-sm btn-danger rounded-0">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
    `;

}

loadProductAPI('iphone');