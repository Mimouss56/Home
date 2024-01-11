export default interface ISites {
  id: number,
  name: string,
  url: string,
  maintenance: boolean,
  ban: true,
  ban_at: Date | null,
  created_at: Date,
  updated_at: Date | null,
}
