import request from 'supertest';
import { app, sequelize } from '../express';


describe('E2E test for product', () => {
  
  beforeEach(async () => {
    await sequelize.sync({force: true})

  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        type: "a",
        price: 12
        
      })

      expect(response.status).toBe(200)
      expect(response.body.name).toBe("Product 1")
      expect(response.body.price).toBe(12)
  });

  it('should not create a product', async () => {
    const response = await request(app)
      .post("/product")
      .send({})

    expect(response.status).toBe(500)
  });


  it('should list all products', async () => {
    const response1 = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        type: "a",
        price: 12
        
      })
    expect(response1.status).toBe(200)
    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Product 2",
        type: "a",
        price: 90
        
      })
    expect(response2.status).toBe(200)
    const listResponse = await request(app)
      .get("/product")
      .send()

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.products.length).toBe(2)
    const product1 = listResponse.body.products[0]
    expect(product1.name).toBe("Product 1")
    expect(product1.price).toBe(12)
    const product2 = listResponse.body.products[1]
    expect(product2.name).toBe("Product 2")
    expect(product2.price).toBe(90)
  });

  it('should find a product', async () => {
    const response = await request(app)
    .post("/product")
    .send({
      name: "Product 1",
      type: "a",
      price: 12
      
    })

    expect(response.status).toBe(200)

    const id = response.body.id
    const output = await request(app).get(`/product/${id}`).send()

    expect(output.status).toBe(200)
    expect(output.body.name).toBe("Product 1")
    expect(output.body.price).toBe(12)
  });

  it('should not find a product', async () => {

    const id = 'any_id'
    const output = await request(app).get(`/product/${id}`).send()

    expect(output.status).toBe(500)
  });

  it('should update a product', async () => {
    const response = await request(app)
    .post("/product")
    .send({
      name: "Product 1",
      type: "a",
      price: 12
      
    })

    expect(response.status).toBe(200)

    const id = response.body.id
    const output = await request(app).put(`/product/${id}`)
      .send({
        name: "Product Updated",
        price: 45
      })

    expect(output.status).toBe(200)
    expect(output.body.name).toBe("Product Updated")
    expect(output.body.price).toBe(45)
  });

  it('should not update a product', async () => {

    const id = 'any_id'
    const output = await request(app).put(`/product/${id}`)
      .send({
        name: "Product Updated",
        price: 45
      })

    expect(output.status).toBe(500)
  });
});