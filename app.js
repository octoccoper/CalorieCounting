// Storage controller

// Item controller
const ItemCtrl = (function () {
  // Item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data structure / State
  const data = {
    items: [
      //   {
      //   id: 0,
      //   name: 'Banana',
      //   calories: 200
      // }, {
      //   id: 1,
      //   name: 'Apple',
      //   calories: 50
      // }, {
      //   id: 2,
      //   name: 'Cheeze',
      //   calories: 300
      //   }
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;
      // Create id
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    logData: function () {
      return data;
    },
    getTotalCalories: function () {
      let total = 0;

      // Loop thrugh the items and add calories
      data.items.forEach(function (item) {
        total += item.calories;
      })

      // Set total calories in data structure
      data.totalCalories = total;

      return data.totalCalories;
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () { 
      return data.currentItem;
    },
    getItemById: function (id) {
      let found = null;
      // Loop through the items
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });

      return found;
    }
  }

})();

// UI controller
const UICtrl = (function () {

  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn"
  };

  // Public methods
  return {
    populateItems: function (items) {
      let html = "";

      items.forEach(item => {
        html += `<li id="item-${item.id}" class="collection-item">
        <strong>${item.name} </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
        </li>`;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: function () { 
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    getSelectors: function () {
      return UISelectors;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    showTotalCalories(total) {
      document.querySelector(UISelectors.totalCalories).textContent = total;
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    addListItem: function (item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";

      // Create li element
      const li = document.createElement("li");

      // Add class
      li.className = "collection-item";

      // Add id
      li.id = `item-${item.id}`;

      // Add html
      li.innerHTML = `<strong>${item.name} </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;

      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    }
  }
})();

// App controller
const AppCtrl = (function (ItemCtrl, UICtrl) {

  // Load event listeners
  const loadEventListeners = function () {
    // Get UISelectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener("click", itemUpdateSubmit);
  };

  // Add item submit
  const itemAddSubmit = function (e) {

    // Get form input from UICtrl
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== "" && input.calories !== "") {

      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to the UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Show totalCalories on the UI
      UICtrl.showTotalCalories(totalCalories);

      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  // Update item
  const itemUpdateSubmit = function (e) {
    if (e.target.classList.contains("edit-item")) {
      // Get list item id 
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split("-");

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  }

  // Public methods
  return {
    init: function () {
      // Set initial state
      UICtrl.clearEditState();

      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItems(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Show totalCalories on the UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  }

})(ItemCtrl, UICtrl);

// Initializing app
AppCtrl.init();