const { TABLES } = require("../config");
const client = require("../database/connection")(TABLES.INCIDENTS);

const { ERROR } = require("../docs");

class IncidentService {
  static async create(req, res) {
    const [id] = await client.insert({ ngo_id: req.headers.authorization, ...req.body });

    return res.send({ id });
  }

  static async findAll(req, res) {
    const { page = 1 } = req.query;
    const limit = 5;

    const incidents = await client
      .select([
        `${TABLES.INCIDENTS}.*`,
        `${TABLES.NGOS}.name`,
        `${TABLES.NGOS}.email`,
        `${TABLES.NGOS}.whatsapp`,
        `${TABLES.NGOS}.city`,
        `${TABLES.NGOS}.state`
      ])
      .join(TABLES.NGOS, `${TABLES.NGOS}.id`, "=", `${TABLES.INCIDENTS}.ngo_id`)
      .limit(limit)
      .offset((page - 1) * 5);

    const [count] = await client.count();

    res.header("X-TOTAL-COUNT", count["count(*)"]);

    return res.send(incidents);
  }

  static async findByNgoId(req, res) {
    const ngo_id = req.headers.authorization;
    const incident = await client.select("*").where({ ngo_id });

    return res.send(incident);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const ngo_id = req.headers.authorization;

    const incident = await client
      .where({ id })
      .select("ngo_id")
      .first();

    if (incident.ngo_id !== ngo_id) return res.status(401).json({ error: ERROR.NOT_ALLOWED });

    await client.where({ id }).delete();

    return res.status(204);
  }
}

module.exports = IncidentService;
