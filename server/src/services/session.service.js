const { TABLES } = require("../config");
const client = require("../database/connection")(TABLES.NGOS);
const { ERROR } = require("../docs");

class SessionService {
  static async create(req, res) {
    const { id } = req.body;
    const ngo = await client.first().where({ id });

    return ngo ? res.send(ngo) : res.status(404).send({ error: ERROR.NOT_FOUND });
  }
}

module.exports = SessionService;
