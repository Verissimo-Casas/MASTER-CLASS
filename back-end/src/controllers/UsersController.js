import User from "../models/User";
import { hashPassword } from "../services/auth";

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
    try {
      const { id } = request.params;
      const user = await User.findById(id);

      if (!user) {
        return response.status(404).json({ message: "User not found." });
      }

      return response.json(user);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error." });
    }
  }

  async create (request, response) {
    try {
      const { email, password } = request.body;
      const user = await User.findOne({ email });

      if (user) {
        return response.status(422).json({ message: `User ${email} already exists` });
      }
      
      const hashedPassword = await hashPassword(password);

      const newUser = await User.create({ 
        email, 
        password: hashedPassword 
      });

      return response.status(201).json(newUser);
      
    } catch (error) {
      return response.status(500).json({ error: "Internal server error." });
    }
  }

  async update (request, response) {
    try {
      const { id } = request.params;
      const { email, password } = request.body;
      const user = await User.findById(id);

      if (!user) {
        return response.status(404).json({ message: "User not found." });
      }

      const hashedPassword = await hashPassword(password);

      const updatedUser = await User.updateOne({
        email,
        password: hashedPassword
      });

      return response.status(200).json();
    } catch (error) {
      
    }
  }

  async delete (request, response) {
    try {
      const { id } = request.params;
      const user = await User.findById(id);

      if (!user) {
        return response.status(404).json({ message: "User not found." });
      }

      await User.deleteOne({ _id: id });

      return response.status(200).json();
    } catch (error) {
      return response.status(500).json({ error: "Internal server error." });
    }
  }

}

export default new UsersController();
