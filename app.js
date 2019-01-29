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
    logData: function () {
      return data;
    }
  }

})();

// UI controller
const UICtrl = (function () {

  // Public methods
  return {

  }
})();

// App controller
const AppCtrl = (function (ItemCtrl, UICtrl) {


  // Public methods
  return {
    init: function () {
      console.log("Initializing app");
    }
  }

})(ItemCtrl, UICtrl);

// Initializing app

AppCtrl.init();