import RosterService from '../services/roster.service'
import { Roster } from '../entity/roster.entity'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'

const router = express.Router()

router.get('/', async (_, res: Response) => {
  const service = new RosterService()
  const response = await service.getAll()

  res.json({ length: response.length, data: response })
})

router.post('/', 
  body('data').isArray(),
  async (req: Request, res: Response) => {
    const service = new RosterService()
    const { data } = req.body

    for(let item of data) {
      let roster = new Roster()
      roster = Object.assign(roster, item)
      await service.insert(roster)   
    }

    res.send('Successfully added to table')
})

export default router