const jsonwebtoken = require("jsonwebtoken");

const { FuncModel, connectToDatabase } = require("../infrastructure/database");

const FuncRepository = {
  async create(data) {
    try {
      await connectToDatabase();
      const model = new FuncModel(data);
      const response = await model.save();
      return response.toObject();
    } catch (e) {
      return e;
    }
  },

  async update(data) {
    try {
      await connectToDatabase();
      const update = {
        nome: data.nome,
        email: data.email,
        servico: data.servico,
        celular: data.celular,
        cidade: data.cidade,
      };
      const options = { new: true };
      const filter = { id: data.id };
      const result = await FuncModel.findOneAndUpdate(
        filter,
        update,
        options
      ).exec();
      if (result === null) return [];
      return result.toObject();
    } catch (e) {
      return e;
    }
  },

  async list() {
    try {
      await connectToDatabase();
      const result = await FuncModel.find();
      return result;
    } catch (error) {
      return error;
    }
  },

  async getByJob(data) {
    try {
      const result = await FuncModel.findOne({ job: data.job }).exec();
      return result;
    } catch (e) {
      return e;
    }
  },

  async delete(data) {
    try {
      await connectToDatabase();
      const result = await FuncModel.deleteOne({ email: data.email }).exec();
      return result.deletedCount;
    } catch (error) {
      return error;
    }
  },

  async login(data) {
    try {
      await connectToDatabase();
      console.log("aqui");

      const user = await FuncModel.findOne({
        email: data.email,
        senha: data.senha,
      });

      console.log(user);

      if (!user) return { erro: "E-mail ou senha incorretos!" };

      const token = await jsonwebtoken.sign(
        {
          email: user.email,
        },
        "getjobs"
      );

      return token;
    } catch (error) {}
  },
};

module.exports = FuncRepository;
