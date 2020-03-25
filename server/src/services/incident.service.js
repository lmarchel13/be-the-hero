const { TABLES } = require("../config");
const connection = require("../database/connection");

const { ERROR } = require("../docs");

class IncidentService {
  static async create(req, res) {
    const client = connection(TABLES.INCIDENTS);
    const [id] = await client.insert({ ngo_id: req.headers.authorization, ...req.body });

    return res.send({ id });
  }

  static async findAll(req, res) {
    const client = connection(TABLES.INCIDENTS);
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
    const client = connection(TABLES.INCIDENTS);
    const ngo_id = req.headers.authorization;
    const incident = await client.select("*").where({ ngo_id });

    return res.send(incident);
  }

  static async delete(req, res) {
    const client = connection(TABLES.INCIDENTS);
    const { id } = req.params;
    const ngo_id = req.headers.authorization;

    const incident = await client
      .where({ id })
      .where({ ngo_id })
      .select("*")
      .first();

    if (!incident) return res.status(404).json({ error: "Not found" });

    if (+incident.id !== +id || incident.ngo_id !== ngo_id) {
      return res.status(401).json({ error: ERROR.NOT_ALLOWED });
    }

    await client
      .where({ id })
      .where({ ngo_id })
      .delete();

    return res.status(204).send({});
  }
}

module.exports = IncidentService;
