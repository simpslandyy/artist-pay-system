import RosterService from '../services/roster.service'
import { Roster } from '../entity/roster.entity'
import express, { Request, Response } from 'express'
import { body, param } from 'express-validator'

const router = express.Router()

router.get('/', async (_, res: Response) => {
  const service = new RosterService()

  try {
    const response = await service.getAll()
    res.json({ length: response.length, data: response })
  } catch (err) {
    // error handle later
  }

})

router.get('/:id',
  param('id').isString(),
  async (req: Request, res: Response) => {
    try {
      const service = new RosterService()
      const { id } = req.params
      const roster = await service.getRosterById(id)

      res.json({ data: roster })
    } catch (err) {
      // error handle later
    }
  })

router.post('/', 
  body('data').isArray(),
  async (req: Request, res: Response) => {
    try {
      const service = new RosterService()
      const { data } = req.body
  
      const payload: Roster[] = []
      for(let item of data) {
        let roster = new Roster()
        roster = Object.assign(roster, item)
        payload.push(roster)
      }

      await service.insert(payload)  
      res.send(`Successfully added ${payload.length} items`)
    } catch (err) {
      // error handle later
    }
  })

export default router