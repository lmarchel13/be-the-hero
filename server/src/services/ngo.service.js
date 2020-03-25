const { generateRandomId } = require("../utils");
const { TABLES } = require("../config");
const connection = require("../database/connection");

class NgoService {
  static async create(req, res) {
    const client = connection(TABLES.NGOS);
    const id = generateRandomId();
    await client.insert({ id, ...req.body });
    return res.send({ id });
  }

  static async findAll(req, res) {
    const client = connection(TABLES.NGOS);
    const ngos = await client.select("*");
    return res.send(ngos);
  }

  static async findById(req, res) {
    const client = connection(TABLES.NGOS);
    const { id } = req.params;
    const ngo = await client.select("*").where({ id });
    return res.send(ngo);
  }
}

module.exports = NgoService;
