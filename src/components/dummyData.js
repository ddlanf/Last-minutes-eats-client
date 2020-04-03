//steps no more than seven 
//ingredients no more than five
//preparetion units "seconds" or "minutes"
//rating no more than 4

const recipes = [
    {
        id: 1,
        name: "Cheesy Noodle with Egg",
        preparation_time: 3,
        preparation_unit: "minutes",
        ingredients: [
            "Sapporo Ichiban Shrimp Noodle Soup 3.5 oz", 
            "1 Large Egg",
            "1/2 cup of water",
            "1 or 2 slice(s) of cheese of your choice"
        ],
        steps: [
            "Boil water in a frying pan.",
            "Add the noodle", 
            "Once the noodels are soft, add the half of soup base from the noodle package. Stir until mixed.",
            "Create a hole in middle of the noodle, add an egg in the hole you just made, and close the lid.",
            "Once the egg is half cooked, place the cheese. Close the lid, and let it sit for 1 more minute.",
            "Mix and enjoy"
        ],
        rating: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSZvysG3fFj0sjsvgm8fJa0Y2Uf8O0rylo8iuheC_0oMKoq43Zb&usqp=CAU"
    },
    {
        id: 2,
        name: "Camembert Bread Bowl",
        preparation_time: 20,
        preparation_unit: "minutes",
        ingredients: [
            "1 Camembert Cheese", 
            "1 Tablespoon Garlic Paste", 
            "2 tablespoons Butter", 
            "1 Circular Bread Loaf"
        ],
        steps: [
            "Cut off the top of the bread loaf, and scoop out a hole large enough to fit the camembert.", 
            "Microwave butter and garlic to create the garlic butter.", 
            "Butter the inside of the bread bowl and lid with the garlic butter.", 
            "Cut the top off of the camembert and place in bowl. Bake for 15 minutes at 180°C (350°F).",
            "Serve with the loaf innards and enjoy."
        ],
        rating: 0,
        image: "https://img.buzzfeed.com/video-api-prod/assets/bc1e5786c62b40488ae775f245756d6f/Bread_Bowl_Still_3.jpg"
    },
    {
        id: 3,
        name: "Eton Mess Ice-Cream Sandwich",
        preparation_time: 10,
        preparation_unit: "minutes",
        ingredients: [
            "12 Strawberries",
            "2 Meringue Nests",
            "1 Scoop Vanilla Ice-Cream", 
        ],
        steps: [
            "Cut the tops off of strawberries and apply to the bottom of two pieces of meringue.",
            "Place a large scoop of ice cream on top of the strawberry side of one meringue and cover with second meringue to create a sandwich.", 
            "Enjoy!"
        ],
        rating: 3.6,
        image: "https://img.buzzfeed.com/video-api-prod/assets/290cf4db4ede4219a3f3a415a816b922/BFV5244_EatonMessIceCreamSandwich-Thumb1080SQ.jpg"
    },
    {
        id: 4,
        name: "Make-Ahead Breakfast Quesadilla",
        preparation_time: 15,
        preparation_unit: "minutes",
        ingredients: [
            "2 Sausage Links",
            "2 Eggs",
            "1 Flour Tortilla",
            "Shredded Cheddar Cheese" 
        ],
        steps: [
            "In a skillet thoroughly cook the sausage and eggs.", 
            "Place mixture in the center of a flour tortilla. Top with cheese, and fold the edges inward to form a sealed pocket.", 
            "Heat on a skillet, seam-side down. Flip and cook until golden brown.", 
            "Enjoy!"
        ],
        rating: 3,
        image: "https://i.pinimg.com/originals/92/47/da/9247daee1f90d66516f16cd4c8108cf3.jpg"
    }, 
    {
        id: 5,
        name: "Baked Salmon",
        preparation_time: 15,
        preparation_unit: "minutes",
        ingredients: [
            "6 oz Skinless Salmon Fillet",
            "Salt and Pepper",
            "Olive Oil",
            "1 Lime",
            "Fresh Thyme" 
        ],
        steps: [
            "Preheat the oven to 400˚F (200˚C).", 
            "Cover a sheet pan with foil or parchment paper.", 
            "Drizzle olive oil on the salmon, then season with salt and pepper. Top with lime slices and thyme.", 
            "Bake for 10-12 minutes. (The salmon should flake easily with a fork when it’s ready.)"
        ],
        rating: 5,
        image: "https://www.cookingclassy.com/wp-content/uploads/2019/06/brown-sugar-lime-baked-salmon-22.jpg"
    }, 
    {
        id: 6,
        name: "Bacon Cheddar Chips",
        preparation_time: 12,
        preparation_unit: "minutes",
        ingredients: [
            "2 Cups Shredded Cheddar Cheese",
            "6 Strips Bacon",
            "1/4 Cup Chives",
            "Salt and Pepper" 
        ],
        steps: [
            "Preheat oven to 350°F (180˚C).", 
            "In a medium-sized mixing bowl, combine cheddar cheese, bacon, chives, salt, and pepper.", 
            "Spoon cheese mixture into a greased mini muffin tin. Press mixture into mini muffin tin.", 
            "Bake for 5-8 minutes or until cheese is melted and edges are slightly brown.",
            "Cool on cooling rack or paper towel for 10 minutes, or take it on the go!"
        ],
        rating: 4,
        image: "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/tips/e204296536bb4d30ba25a5bd739c09ba.jpeg?output-quality=auto&downsize=800:*"
    }
]

module.exports = recipes