let cars = [];
let currentEditIndex = null;

function addCar() {
    const brandInput = document.getElementById('brand');
    const modelInput = document.getElementById('model');
    const yearInput = document.getElementById('year');
    const colorInput = document.getElementById('color');

    const brand = brandInput.value.trim();
    const model = modelInput.value.trim();
    const year = parseInt(yearInput.value);
    const color = colorInput.value.trim();

    if (!brand || !model || isNaN(year) || !color) {
        alert('Пожалуйста, правильно заполните все поля.');
        return;
    }

    const car = {
        brand: brand,
        model: model,
        year: year,
        color: color,
        displayInfo: function () {
            return `${this.brand} ${this.model} (${this.year}), Цвет: ${this.color}`;
        }
    };

    cars.push(car);
    updateCarList();
    brandInput.value = '';
    modelInput.value = '';
    yearInput.value = '';
    colorInput.value = '';
}

function updateCarList() {
    const carList = document.getElementById('car-list');
    carList.innerHTML = '';
    cars.forEach((car, index) => {
        const li = document.createElement('li');
        li.classList.add('car-item');
        li.textContent = car.displayInfo();

        const editButton = document.createElement('button');
        editButton.textContent = 'Изменить';
        editButton.classList.add('btn', 'btn-primary');
        editButton.onclick = function() {
            editCar(index);
        };
        li.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.onclick = function() {
            deleteCar(index);
        };
        li.appendChild(deleteButton);

        carList.appendChild(li);
    });
}

function editCar(index) {
    const car = cars[index];
    const editBrandInput = document.getElementById('editBrand');
    const editModelInput = document.getElementById('editModel');
    const editYearInput = document.getElementById('editYear');
    const editColorInput = document.getElementById('editColor');

    editBrandInput.value = car.brand;
    editModelInput.value = car.model;
    editYearInput.value = car.year;
    editColorInput.value = car.color;

    document.getElementById('addCarForm').style.display = 'none';
    document.getElementById('editCarForm').style.display = 'block';

    currentEditIndex = index;
}

function saveChanges() {
    const car = cars[currentEditIndex];
    const editBrandInput = document.getElementById('editBrand');
    const editModelInput = document.getElementById('editModel');
    const editYearInput = document.getElementById('editYear');
    const editColorInput = document.getElementById('editColor');

    const newBrand = editBrandInput.value.trim();
    const newModel = editModelInput.value.trim();
    const newYear = parseInt(editYearInput.value);
    const newColor = editColorInput.value.trim();

    if (!newBrand || !newModel || isNaN(newYear) || !newColor) {
        alert('Пожалуйста, правильно заполните все поля.');
        return;
    }

    car.brand = newBrand;
    car.model = newModel;
    car.year = newYear;
    car.color = newColor;

    updateCarList();

    cancelEdit();
}

function cancelEdit() {
    document.getElementById('addCarForm').style.display = 'block';
    document.getElementById('editCarForm').style.display = 'none';
    currentEditIndex = null;
}

function deleteCar(index) {
    cars.splice(index, 1);
    updateCarList();
}