export const lists = [
    {
        id: 1,
        slug: 'boda',
        data: {
            name: 'Boda',
            numberPeople: '100',
        },

        rows: [
            { id: 1, name: "Diablito", price: "500", qty: "2", amount: "1000",complete:true },
            { id: 2, name: "Vaso", price: "25", qty: "3", amount: "75", complete:false },
            { id: 3, name: "Plato", price: "100", qty: "7", amount: "700", complete:true },
            { id: 4, name: "Taza", price: "50", qty: "6", amount: "300", complete:false },
        ]
    },
    {
        id: 2,
        slug: 'banquet',
        data: {
            name: 'Banquete',
            numberPeople: '300',
        },
        rows: [
            { id: 1, name: "Diablito", price: "500", qty: "2", amount: "1000", complete:false },
            { id: 2, name: "Vaso", price: "25", qty: "3", amount: "75", complete:true },
            { id: 3, name: "Plato", price: "100", qty: "7", amount: "700", complete:false },
            { id: 4, name: "Taza", price: "50", qty: "6", amount: "300", complete:true },
        ]
    },
    {
        id: 3,
        slug: 'evento-especial',
        data: {
            name: 'Evento especial',
            numberPeople: '700',
        },

        rows: [
            { id: 1, name: "Diablito", price: "500", qty: "2", amount: "1000", complete:false },
            { id: 2, name: "Vaso", price: "25", qty: "3", amount: "75" , complete:true },
            { id: 3, name: "Plato", price: "100", qty: "7", amount: "700", complete:true },
            { id: 4, name: "Taza", price: "50", qty: "6", amount: "300", complete:false },
        ]
    },
    {
        id: 4,
        slug: 'quince-años',
        data: {
            name: 'Quince años',
            numberPeople: '50',
        },
        rows: [
            { id: 1, name: "Diablito", price: "500", qty: "2", amount: "1000" , complete:true },
            { id: 2, name: "Vaso", price: "25", qty: "3", amount: "75" , complete:false },
            { id: 3, name: "Plato", price: "100", qty: "7", amount: "700" , complete:false },
            { id: 4, name: "Taza", price: "50", qty: "6", amount: "300" , complete:true },
        ]
    },
];