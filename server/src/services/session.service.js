const { TABLES } = require("../config");
const connection = require("../database/connection");
const { ERROR } = require("../docs");

class SessionService {
  static async create(req, res) {
    const client = connection(TABLES.NGOS);
    const { id } = req.body;
    const ngo = await client.first().where({ id });

    return ngo ? res.send(ngo) : res.status(404).send({ error: ERROR.NOT_FOUND });
  }
}

module.exports = SessionService;
