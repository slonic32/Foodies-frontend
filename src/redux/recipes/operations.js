import { createAsyncThunk } from '@reduxjs/toolkit';

// Mock recipe data
const mockRecipes = [
    {
        id: 1,
        strMeal: 'Bakewell Tart',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwvq1468806114.jpg',
        strCategory: 'Dessert',
        strArea: 'British',
        strInstructions: 'To make the pastry, measure the flour into a bowl and rub in the butter with your fingertips until the mixture resembles fine breadcrumbs.',
        owner: { name: 'Ivetta', avatar: null },
    },
    {
        id: 2,
        strMeal: 'Apfelstrudel',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/qptpvt1468693604.jpg',
        strCategory: 'Dessert',
        strArea: 'Austrian',
        strInstructions: 'Preheat oven to 180C / Gas 4. Mix the flour, breadcrumbs, sugar and spices together in a large bowl.',
        owner: { name: 'Maria', avatar: null },
    },
    {
        id: 3,
        strMeal: 'Chocolate Avocado Mousse',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/qowutp1468694696.jpg',
        strCategory: 'Dessert',
        strArea: 'American',
        strInstructions: 'Divide avocado in half, remove the pit, and scoop into a food processor. Add cocoa powder, milk, and honey.',
        owner: { name: 'Oliver', avatar: null },
    },
    {
        id: 4,
        strMeal: 'Banana Chocolate Mousse',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/tqtins1519244285.jpg',
        strCategory: 'Dessert',
        strArea: 'French',
        strInstructions: 'Combine the chocolate and water in a microwave safe bowl and heat until melted. Add banana and blend until smooth.',
        owner: { name: 'Sophie', avatar: null },
    },
    {
        id: 5,
        strMeal: 'Battenberg Cake',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/gsqwvu1511557373.jpg',
        strCategory: 'Dessert',
        strArea: 'British',
        strInstructions: 'Preheat the oven to 180C/350F/Gas 4. Grease and line a square cake tin with baking parchment.',
        owner: { name: 'James', avatar: null },
    },
    {
        id: 6,
        strMeal: 'Carrot Cake',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/flsqxz1568837675.jpg',
        strCategory: 'Dessert',
        strArea: 'American',
        strInstructions: 'Preheat oven to 350°F. Mix oil, sugar, eggs and vanilla together. Stir in carrots, flour, and spices.',
        owner: { name: 'Emma', avatar: null },
    },
    {
        id: 7,
        strMeal: 'Cheesecake',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/svqwuo1511876081.jpg',
        strCategory: 'Dessert',
        strArea: 'American',
        strInstructions: 'Preheat oven to 325°F. Mix graham cracker crumbs with butter and press into the bottom of a pan.',
        owner: { name: 'Liam', avatar: null },
    },
    {
        id: 8,
        strMeal: 'Chocolate Raspberry Cheesecake',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/wnwnqx1549626822.jpg',
        strCategory: 'Dessert',
        strArea: 'American',
        strInstructions: 'Preheat oven to 300 degrees. Mix together crushed graham crackers, melted butter, and press into a springform pan.',
        owner: { name: 'Ava', avatar: null },
    },
    {
        id: 9,
        strMeal: 'Chocolate Souffle',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/qsxwtu1511792321.jpg',
        strCategory: 'Dessert',
        strArea: 'French',
        strInstructions: 'Preheat the oven to 200°C. Butter and sugar a 1.5L soufflé dish. Melt chocolate and fold into egg whites.',
        owner: { name: 'Noah', avatar: null },
    },
    {
        id: 10,
        strMeal: 'Crème Brûlée',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/ruwpww1516361732.jpg',
        strCategory: 'Dessert',
        strArea: 'French',
        strInstructions: 'Heat the milk and cream until steaming. Whisk the egg yolks with sugar until pale and thick.',
        owner: { name: 'Isabella', avatar: null },
    },
    {
        id: 11,
        strMeal: 'Sticky Toffee Pudding',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/xpsysn1511217323.jpg',
        strCategory: 'Dessert',
        strArea: 'British',
        strInstructions: 'Preheat oven to 180°C. Soak the dates in hot water for 10 minutes then drain and chop finely.',
        owner: { name: 'Charlotte', avatar: null },
    },
    {
        id: 12,
        strMeal: 'Tiramisu',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/kvbovm1582834645.jpg',
        strCategory: 'Dessert',
        strArea: 'Italian',
        strInstructions: 'Beat egg yolks with sugar. Add mascarpone and mix well. Dip ladyfingers in espresso.',
        owner: { name: 'Lucas', avatar: null },
    },
];

export const fetchRecipesByCategory = createAsyncThunk(
    'recipes/fetchByCategory',
    async (category) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (category && category.toLowerCase() !== 'all') {
            // Filter mock data by category
            return mockRecipes;
        }
        return mockRecipes;
    }
);

export const fetchRecipeById = createAsyncThunk(
    'recipes/fetchById',
    async (id) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockRecipes.find(recipe => recipe.id === parseInt(id));
    }
);

export const fetchRecipesByFilters = createAsyncThunk(
    'recipes/fetchByFilters',
    async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockRecipes;
    }
);