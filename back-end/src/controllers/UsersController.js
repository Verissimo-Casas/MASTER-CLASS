import User from "../models/User";

class UsersController {
  async index (request, response) {
    try {
      const users = await User.find();
      return response.json(users);
    } catch (error) {
      return response.status(500).json({ error: "Error loading users" });
    }
  }

  async show (request, response) {

  }

  async create (request, response) {
    try {
      const { email, password } = request.body;
      const user = await User.findOne({ email });

      if (user) {
        return response.status(422).json({ message: `User ${email} already exists` });
      }

      const newUser = await User.create({ email, password });
      return response.status(201).json(newUser);
      
    } catch (error) {
      return response.status(500).json({ error: "Internal server error." });
    }
  }

  async update (request, response) {

  }

  async detroy (request, response) {

  }

}

export default new UsersController();
