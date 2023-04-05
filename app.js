const { ScanCommand,PutCommand , DeleteCommand , GetCommand , UpdateCommand} = require('@aws-sdk/lib-dynamodb')
const cuid = require('cuid')

const documentClient = require('./dynamoDbClient')

const TableName = 'Product'

async function addProduct(product){
    const res = await documentClient.send(new PutCommand({
        TableName:TableName,
        Item:product
    }))
    console.log("🚀 ~ file: app.js:11 ~ getAllProduct ~ res:", res)
}
const product = {
    id:cuid(),
    name : 'iPhone 13',
    price:123434
}
// addProduct(product)

async function getAllProduct(){
    const res = await documentClient.send(new ScanCommand({
        TableName:TableName
    }))
    console.log("🚀 ~ file: app.js:11 ~ getAllProduct ~ res:", res)
}

// getAllProduct()


async function getProductById(id){
    const res = await documentClient.send(new GetCommand({
        TableName:TableName,
        Key:{
            id:id
        }
    }))
    console.log("🚀 ~ file: app.js:11 ~ getAllProduct ~ res:", res)
}

// getProductById('clg3j75sa00008h1ng3kl6ahb')

async function deleteProductById(id){
    const res = await documentClient.send(new DeleteCommand({
        TableName:TableName,
        Key:{
            id:id
        }
    }))
    // console.log("🚀 ~ file: app.js:11 ~ getAllProduct ~ res:", res)
}

// deleteProductById('random-unique-key')


async function updateProductById(updatedProduct){
    // const res = await documentClient.send(new PutCommand({
    //     TableName:TableName,
    //     Item:updatedProduct
    // }))
    const res = await documentClient.send(new UpdateCommand({
        TableName,
        Key:{
            id:updatedProduct.id
        },
        UpdateExpression:'set price = :p',
        ExpressionAttributeValues:{
            ':p':updatedProduct.price
        }
    }))
    console.log(res)
}
const updatedProduct = { price: 1, id: 'clg3j75sa00008h1ng3kl6ahb', name: 'iPhone 13', color:'Blue' }
// updateProductById(updatedProduct)