import express, { Request, Response } from 'express'
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase'
import { FindProductUseCase } from '../../../usecase/product/find/find.product.usecase'
import { ListProductsUseCase } from '../../../usecase/product/list/list.product.usecase'
import { UpdateProductUseCase } from '../../../usecase/product/update/update.product.usecase'
import { ProductRepository } from '../../product/repository/sequelize/product.repository'

export const productRoute = express.Router()

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository())
  try {
    const productDto = {
      name: req.body.name,
      type: req.body.type,
      price: req.body.price
    }

    const output = await usecase.execute(productDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductsUseCase(new ProductRepository())
  try {
    const output = await usecase.execute({})
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

productRoute.get("/:id", async (req: Request, res: Response) => {
  const usecase = new FindProductUseCase(new ProductRepository())
  try {
    const productDto = {
      id: req.params.id
    }
    const output = await usecase.execute(productDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

productRoute.put("/:id", async (req: Request, res: Response) => {
  const usecase = new UpdateProductUseCase(new ProductRepository())
  try {
    const productDto = {
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,

    }
    const output = await usecase.execute(productDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})
