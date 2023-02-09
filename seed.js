var seeder = require("mongoose-seed");
var mongoose = require("mongoose");

// Connect to MongoDB via Mongoose
seeder.connect(
  "mongodb+srv://camideli:Bara1234@cluster0.10owyxz.mongodb.net/db_camideli?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    // useFindAndModify: true,
    useUnifiedTopology: true,
  },
  function () {
    // Load Mongoose models
    seeder.loadModels([
      "./models/Category",
      "./models/Bank",
      "./models/Item",
      "./models/Member",
      "./models/Order",
      "./models/Users",
    ]);
    // console.log("seeder.loadModels");
    // Clear specified collections
    seeder.clearModels(
      ["Category", "Bank", "Item", "Member", "Order", "Users"],
      function () {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
          seeder.disconnect();
        });
      }
    );
  }
);

var data = [
  // start category
  {
    model: "Category",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901111"),
        name: "Kopi",
        itemId: [
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902222") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902223") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902224") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902225") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901112"),
        name: "Cake",
        itemId: [
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902226") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902227") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902228") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902229") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901113"),
        name: "Dimsum",
        itemId: [
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902230") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902231") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902232") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902233") },
        ],
      },
    ],
  },
  // end category
  // start item
  {
    model: "Item",
    documents: [
      // Tabby Town
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
        name: "Kopi Aren",
        price: 12,
        stock: 1,
        status: 1,
        description:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb1") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb2") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb3") },
        ],
        categoryId: "5e96cbe292b97300fc901111",
      },
      // Seattle Rain
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
        name: "Kopi Mocha",
        price: 12,
        stock: 1,
        status: 1,
        description:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb4") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb5") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb6") },
        ],

        categoryId: "5e96cbe292b97300fc901111",
      },

      // Wodden Pit
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902224"),
        name: "Kopi Bailey",
        price: 12,
        stock: 1,
        status: 1,
        description:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb7") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb8") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb9") },
        ],

        categoryId: "5e96cbe292b97300fc901111",
      },

      // Anggana
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902225"),
        name: "Kopi Butterscotch",
        price: 12,
        stock: 1,
        status: 1,
        description:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd10") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd11") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd12") },
        ],

        categoryId: "5e96cbe292b97300fc901111",
      },

      // Green Park
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902226"),
        name: "Cake Strawberry",
        price: 12,
        stock: 1,
        status: 1,
        description:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd13") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd14") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd15") },
        ],

        categoryId: "5e96cbe292b97300fc901112",
      },

      // Podo Wae
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902227"),
        name: "Cake Orange",
        price: 12,
        stock: 1,
        status: 1,
        description:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd16") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd17") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd18") },
        ],

        categoryId: "5e96cbe292b97300fc901112",
      },

      // Silver Rain
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902228"),
        name: "Cake Chocolate",
        price: 12,
        stock: 1,
        status: 1,
        description:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd19") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd20") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd21") },
        ],

        categoryId: "5e96cbe292b97300fc901112",
      },

      // Cashville
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902229"),
        name: "Cake Vanilla",
        price: 12,
        stock: 1,
        status: 1,
        description:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd22") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd23") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd24") },
        ],

        categoryId: "5e96cbe292b97300fc901112",
      },

      // PS Wood
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902230"),
        name: "Siomay Ayam kukus",
        price: 12,
        stock: 1,
        status: 1,
        description:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd25") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd26") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd27") },
        ],

        categoryId: "5e96cbe292b97300fc901113",
      },

      // One Five
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902231"),
        name: "Siomay Ayam Goreng",
        price: 12,
        stock: 1,
        status: 1,
        description:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd28") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd29") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd30") },
        ],

        categoryId: "5e96cbe292b97300fc901113",
      },

      // Minimal
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902232"),
        name: "Siomay Ayam Bakar",
        price: 12,
        stock: 1,
        status: 1,
        description:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd32") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd31") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd33") },
        ],
        categoryId: "5e96cbe292b97300fc901113",
      },

      // Stays Home
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902233"),
        name: "Gyoza",
        price: 12,
        stock: 1,
        status: 1,
        description:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        imageId: [
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd36") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd34") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd35") },
          // done
        ],

        categoryId: "5e96cbe292b97300fc901113",
      },
    ],
  },
  // end item

  // start order
  {
    model: "Order",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cee1"),
        orderDate: "2020-04-10",
        invoice: 1231231,
        itemId: [
          {
            _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
            name: "Kopi Aren",
            price: 6,
            quantity: 2,
          },
        ],
        total: 12,
        memberId: mongoose.Types.ObjectId("5e96cbe292b97300fc903333"),
        bankId: mongoose.Types.ObjectId("5e96cbe292b97300fc903323"),
        payments: {
          proofPayment: "images/bukti.jpeg",
          bankFrom: "BCA",
          status: "Proses",
          accountHolder: "ang",
        },
        status: "menunggu konfirmasi",
      },
    ],
  },
  // end booking

  // member
  {
    model: "Member",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903333"),
        firstName: "Samira Rahma",
        lastName: "Aziza",
        email: "samira@gmail.com",
        phoneNumber: "082377954008",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903334"),
        firstName: "Mira",
        lastName: "Rahma",
        email: "mirra@gmail.com",
        phoneNumber: "082377954008",
      },
    ],
  },
  {
    model: "Bank",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903322"),
        bankName: "Mandiri",
        accountNumber: "089898",
        name: "Samira",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903323"),
        bankName: "BCA",
        accountNumber: "878678",
        name: "Rahma",
      },
    ],
  },
  {
    model: "Users",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903345"),
        username: "admin",
        password: "admin",
      },
    ],
  },
];
