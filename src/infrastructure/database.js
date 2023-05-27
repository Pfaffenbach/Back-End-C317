const mongoose = require("mongoose");

// const uri = `mongodb+srv://user:user@cluster0.lhcebkf.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://user:user@cluster0.n74vhup.mongodb.net/?retryWrites=true&w=majority`;

const connectToDatabase = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const disconnectFromDatabase = async () => {
  await mongoose.disconnect();
};

const { Schema } = mongoose;

const FuncSchema = new Schema({
  id: {
    type: String,
    index: true,
    unique: true,
  },
  email: {
    type: String,
  },
  nome: String,
  servico: String,
  celular: String,
  cidade: String,
});

const UserSchema = new Schema({
  id: {
    type: String,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  nome: String,
  senha: String,
});

const FuncModel = mongoose.model("profissionais", FuncSchema);
const UserModel = mongoose.model("users", UserSchema);

module.exports = {
  FuncModel,
  UserModel,
  connectToDatabase,
  disconnectFromDatabase,
};
