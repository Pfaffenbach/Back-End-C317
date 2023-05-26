const jsonwebtoken = require("jsonwebtoken");

const { UserModel, connectToDatabase } = require("../infrastructure/database");

const UserRepository = {
  async create(data) {
    try {
      await connectToDatabase();
      const model = new UserModel(data);
      const response = await model.save();
      return response.toObject();
    } catch (e) {
      return e;
    }
  },

  async login(data) {
    try {
      await connectToDatabase();

      const user = await UserModel.findOne({
        email: data.email,
        senha: data.senha,
      });

      if (user === null) return null;

      const token = await jsonwebtoken.sign(
        {
          email: user.email,
          name: user.nome,
        },
        "getjobs"
      );

      return token;
    } catch (error) {}
  },
};

module.exports = UserRepository;
