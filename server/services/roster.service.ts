
import { Repository, Connection, getConnection } from 'typeorm'
import { Roster } from '../entity/roster.entity'

/**
 * RosterService
 * 
 */
export default class RosterService {

  private repository: Repository<Roster>
  private connection: Connection
  /**
   * Connect
   * connect to the Roster repository using the fetched connection
   */
  private async connect () {
    try {
      this.connection = await getConnection()
      this.repository = this.connection.getRepository(Roster)
    } catch (err) {
      throw 'Unable to establish connection'
    }
  }

  /**
   * getAll
   * @returns Roster[] - a list of Roster elements { artist: string, rate: numeric, stream: numeric }
   */
  public async getAll(): Promise<Roster[]> {
    try {
      if (!this.connection || !this.repository) await this.connect()
      return this.repository.find()
    } catch (err) {
      throw err
    }
  }

  /**
   * getRosterById
   * @param id 
   * @returns Roster - a single Roster element
   */
  public async getRosterById(id: string): Promise<Roster> {
    try {
      if (!this.connection || !this.repository) await this.connect()
      return this.repository.findOne(id)
    } catch (err) {
      throw err
    }
  }

  /**
   * Update
   * @param id - number, a unique identifer of Roster record
   * @param rate - number, the new rate for the artist with id `id`
   * @returns Roster, updated roster record
   */
   public async updateRateById(id: string, rate: number): Promise<Roster> {
    try {
      if (!this.connection || !this.repository) await this.connect()
      const roster = await this.repository.findOne(id)

      if (!roster) return null

      roster.rate = rate
      await this.repository.save(roster)
      return roster
    } catch (err) {
      throw err
    }
  }

  /**
   * Update
   * @param id - number, a unique identifer of Roster record
   * @param rate - number, the new rate for the artist with id `id`
   * @returns Roster, updated roster record
   */
   public async updatePaidById(id: string, paid: boolean): Promise<Roster> {
    try {
      if (!this.connection || !this.repository) await this.connect()
      const roster = await this.repository.findOne(id)
      if (!roster) return null

      roster.paid = paid
      await this.repository.save(roster)
      return roster
    } catch (err) {
      throw err
    }
  }
  

  /**
   * Update
   * @param id - number, a unique identifer of Roster record
   * @param updatedRoster - Roster, a single Roster record representing the changes to be made to existing Roster record
   * @returns Roster, updated roster record
   */
  public async update(id: string, updatedRoster: Roster): Promise<Roster> {
    try {
      if (!this.connection || !this.repository) await this.connect()
      const roster = await this.repository.findOne(id)
      if (!roster) return null

      roster.rate = updatedRoster.rate || roster.rate
      roster.streams = updatedRoster.streams || roster.streams
      roster.artist = updatedRoster.artist || roster.artist
      roster.paid = updatedRoster.paid || roster.paid

      await this.repository.save(roster)
      return roster
    } catch (err) {
      throw err
    }
  }

  /**
   * Insert
   * @param payload - Roster, a single Roster record
   */
  public async insert(payload: Roster[]) {
    try {
      if (!this.connection || !this.repository) await this.connect()
      this.connection
        .createQueryBuilder()
        .insert()
        .into(Roster)
        .values(payload)
        .execute()
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete
   * @param id - number, unique identifier of Roster record
   */
  public async delete(id: string) {
    try {
      if (!this.connection || !this.repository) await this.connect()
      await this.repository.softDelete(id)
    } catch (err) {
      throw err
    }
  }

}