class HelloController {
  async index (req, res) {
    return res.json({ message: 'Hello World tudo bem' });
  }
}

export default new HelloController();