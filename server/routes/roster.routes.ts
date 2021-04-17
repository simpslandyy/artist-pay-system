import RosterService from '../services/roster.service'
import { Roster } from '../entity/roster.entity'
import express, { Request, Response } from 'express'
import { body, param, query } from 'express-validator'

const router = express.Router()

router.get('/', async (_, res: Response) => {
  const service = new RosterService()

  try {
    const response = await service.getAll()
    res.json({ length: response.length, data: response })
  } catch (err) {
    res.status(500).send('Unable to fulfill request.')
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
      res.status(500).send('Unable to fulfill request.')
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
      res.status(500).send('Unable to fulfill request.')
    }
  })

router.delete('/:id',
  param('id').isString(),
  async (req: Request, res: Response) => {
    try {
      const service = new RosterService()
      const { id } = req.params
      await service.delete(id)

      res.send(`Successfully deleted ${id}`)
    } catch (err) {
      res.status(500).send('Unable to fulfill request.')
    }
})

router.patch('/deleteBulk', 
  body('ids').isArray(),
  async (req: Request, res: Response) => {
    try {
      const service = new RosterService()
      const { ids } = req.body
    
      const results:Roster[] = []
      for(let id of ids) {
        await service.delete(id)  
      }

      res.send(`Successfully deleted ${results.length} records`)
    } catch (err) {
      res.status(500).send('Unable to fulfill request.')
    }
  })

router.patch('/updatePayment', 
  body('ids').isArray(),
  query('isPaid').isString(),
  async (req: Request, res: Response) => {
    try {
      const service = new RosterService()
      const { ids } = req.body
      const isPaid = req.query?.isPaid && req.query?.isPaid === 'true' ? true : false
      await service.updatePaidByMultipleIds(ids, isPaid)

      res.send(`Successfully updated ${ids.length} payments.`)
    } catch (err) {
      res.status(500).send('Unable to fulfill request.')
    }
  })
export default router