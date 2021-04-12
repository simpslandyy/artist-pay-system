
import { Repository, Connection, getConnection } from 'typeorm'
import { Roster } from '../entity/roster.entity'

/**
 * RosterService
 * 
 */
export default class RosterService {

  private repository: Repository<Roster>

  /**
   * Connect
   * connect to the Roster repository using the fetched connection
   */
  private async connect () {
    const connection: Connection = await getConnection()
    // if (!connection) throw 
    this.repository = connection.getRepository(Roster)
  }

  /**
   * getAll
   * @returns Roster[] - a list of Roster elements { artist: string, rate: numeric, stream: numeric }
   */
  public async getAll(): Promise<Roster[]> {
    await this.connect()
    return this.repository.find()
  }

  /**
   * Insert
   * @param
   * @return 
   */
  public async insert(payload: Roster) {
    await this.connect()
    await this.repository.save(payload)
  }

  /**
   * Delete
   * @param id unique identifier of Roster record
   */
  public async delete(id: string) {
    await this.connect()
    await this.repository.delete(id)
  }

}