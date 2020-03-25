const { generateRandomId } = require("../utils");
const { TABLES } = require("../config");
const client = require("../database/connection")(TABLES.NGOS);

class NgoService {
  static async create(req, res) {
    await client.insert({ id: generateRandomId(), ...req.body });
    return res.send({ id });
  }

  static async findAll(req, res) {
    const ngos = await client.select("*");
    return res.send(ngos);
  }

  static async findById(req, res) {
    const { id } = req.params;
    const ngo = await client.select("*").where({ id });
    return res.send(ngo);
  }
}

module.exports = NgoService;
