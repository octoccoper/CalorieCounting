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
    items: [{
      id: 0,
      name: 'Banana',
      calories: 200
    }, {
      id: 1,
      name: 'Apple',
      calories: 50
    }, {
      id: 2,
      name: 'Cheeze',
      calories: 300
    }],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    getItems: function () {
      return data.items;
    },
    logData: function () {
      return data;
    }
  }

})();

// UI controller
const UICtrl = (function () {

  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn"
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
    getSelectors: function () {
      return UISelectors;
    }
  }
})();

// App controller
const AppCtrl = (function (ItemCtrl, UICtrl) {

  // Load event listeners
  const loadEventListeners = function () {
    // Get UISelectors
    const UISelectors = UICtrl.getSelectors();
  };

  // Add item event
  document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);

  // Add item submit
  const itemAddSubmit = function (e) {
    console.log("Add");
    e.preventDefault();
  }

  // Public methods
  return {
    init: function () {
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItems(items);

      // Load event listeners
      loadEventListeners();
    }
  }

})(ItemCtrl, UICtrl);

// Initializing app

AppCtrl.init();