export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields:[
        {
            name: 'image',
            title:'Image',
            type: 'array',
            of:[{type: 'image'}],
            options:{
                hotospot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options:{
                source: 'name',
                maxLength:'90'
            }
        },
        {
            name:'qty',
            title: 'Quantity',
            type: 'number'
        },
        {
            name:'price',
            title: 'Price',
            type: 'number'
        },
        {
            name:'category',
            title:'Category',
            type:'string'  
        },
        {
            name:'type',
            title:'Type',
            type:'string'  
        },
        {
            name:'provider',
            title:'Provider',
            type:'string'  
        },
        {
            name:'details',
            title:'Detail',
            type:'string'  
        },
    ]
}