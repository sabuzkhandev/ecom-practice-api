const loadProductAPI = async(searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    loadProduct(data.data);
}

const loadProduct = phones =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ``;
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
            <a href="#" class="btn btn-primary rounded-0 custom">Product Details</a>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phonediv);
        
    })
}

document.getElementById('product-search').addEventListener('click',function(){
    const productSearching = document.getElementById('searching');
    const searchText = productSearching.value;
    loadProductAPI(searchText);
    productSearching.value = '';
});

// document.getElementById('searching').addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') {
//         loadProductAPI();
//     }
// });

loadProductAPI('iphone');