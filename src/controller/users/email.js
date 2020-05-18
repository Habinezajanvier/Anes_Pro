import bcrypt from 'bcryptjs';
import model from '../../models';
import getToken from '../../helper/token';

const { User } = model;

class EmailController {
  static async userSignup(req, res) {
    const {
      username, firstName, secondName, email, password
    } = req.body;
    const account = await User.findOne({ email, platform: 'email' });

    if (account) return res.status(200).send({ msg: 'Account exist, login instead' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      platform: 'email',
      password: hashedPassword,
      username,
      firstName,
      secondName,
      email
    });
    try {
      const savedUser = await user.save();
      const token = await getToken({ user: savedUser._id });
      return res.status(201).send({ token, savedUser });
    } catch (error) {
      return res.status(400).send({ msg: error.message });
    }
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ msg: 'Account not found, signup!' });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send({ msg: 'email or password not correct' });

    try {
      const token = await getToken({ user: user._id });
      return res.status(200).send({ token, user });
    } catch (error) {
      return res.status(400).send({ msg: error.message });
    }
  }
}

export default EmailController;
