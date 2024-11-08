export class CandidateModel {
  id: string
  user_id: string

  constructor (payload: CandidateModel) {
    this.id = payload.id
    this.user_id = payload.user_id
  }
}